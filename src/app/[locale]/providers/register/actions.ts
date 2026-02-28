'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';

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

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 3;

  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxRequests) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);

  // Cleanup old entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, vals] of rateLimitMap) {
      const filtered = vals.filter((t) => now - t < windowMs);
      if (filtered.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, filtered);
      }
    }
  }

  return false;
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

export type SubmitResult = { success: true } | { error: string };

export async function submitProviderApplication(
  formData: Record<string, unknown>,
): Promise<SubmitResult> {
  // Rate limit by IP
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return { error: 'rate_limited' };
  }

  // Validate
  const parsed = providerSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: 'validation_error' };
  }

  const data = parsed.data;

  // Honeypot check (already validated as empty, but double-check)
  if (data.honeypot !== '') {
    // Silently reject — pretend success to not tip off bots
    return { success: true };
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

  // Insert via service role client
  const supabase = createAdminClient();

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
    // Store contact name in location_notes since there's no dedicated column
    location_notes: `Contact: ${contactName}`,
  });

  if (error) {
    console.error('Provider insert error:', error);
    return { error: 'server_error' };
  }

  return { success: true };
}
