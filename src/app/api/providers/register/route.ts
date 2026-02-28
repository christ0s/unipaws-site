export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const VALID_CATEGORIES = [
  'pet_friendly_restaurant',
  'grooming',
  'pet_sitting',
  'dog_walking',
  'training',
  'pet_shop',
  'other',
] as const;

const VALID_PETS = ['dog', 'cat', 'other'] as const;

const providerSchema = z.object({
  businessName: z.string().min(2).max(100),
  categories: z.array(z.enum(VALID_CATEGORIES)).min(1),
  shortDescription: z.string().min(10).max(300),
  contactName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  website: z.string().url().optional().or(z.literal('')),
  address: z.string().min(5).max(200),
  city: z.string().min(2).max(50),
  area: z.string().max(50).optional().or(z.literal('')),
  postalCode: z.string().regex(/^\d{5}$/).optional().or(z.literal('')),
  acceptedPets: z.array(z.enum(VALID_PETS)).min(1),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: 'Privacy consent is required' }),
  }),
  honeypot: z.string().max(0),
});

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Validate
  const parsed = providerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_error' }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot check — silently reject bots
  if (data.honeypot !== '') {
    return NextResponse.json({ success: true });
  }

  // Sanitize text fields
  const name = stripHtml(data.businessName);
  const description = stripHtml(data.shortDescription);
  const contactName = stripHtml(data.contactName);
  const address = stripHtml(data.address);
  const city = stripHtml(data.city);
  const area = data.area ? stripHtml(data.area) : null;
  const postalCode = data.postalCode || null;
  const website = data.website || null;

  // Access Cloudflare runtime env (process.env doesn't work for secrets on CF Pages)
  const { env } = getRequestContext();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const { error } = await supabase.from('service_providers').insert({
    name,
    short_description: description,
    description,
    categories: data.categories,
    phone: data.phone,
    email: data.email,
    website,
    address,
    city,
    area,
    postal_code: postalCode,
    accepted_pets: data.acceptedPets,
    status: 'pending',
    is_verified: false,
    is_active: false,
    is_claimed: false,
    location_notes: `Contact: ${contactName}`,
  });

  if (error) {
    console.error('Provider insert error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
