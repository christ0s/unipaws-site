'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { submitProviderApplication, type SubmitResult } from '@/app/[locale]/providers/register/actions';

const CATEGORIES = [
  'pet_friendly_restaurant',
  'grooming',
  'pet_sitting',
  'dog_walking',
  'training',
  'pet_shop',
  'other',
] as const;

const PET_TYPES = ['dog', 'cat', 'other'] as const;

type FormErrors = Record<string, string>;

export function ProviderRegistrationForm() {
  const t = useTranslations('providers.register');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  // Form state
  const [businessName, setBusinessName] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [shortDescription, setShortDescription] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [acceptedPets, setAcceptedPets] = useState<string[]>([]);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (businessName.length < 2) newErrors.businessName = 'min 2';
    if (categories.length === 0) newErrors.categories = 'required';
    if (shortDescription.length < 10) newErrors.shortDescription = 'min 10';
    if (contactName.length < 2) newErrors.contactName = 'min 2';
    if (!email.includes('@')) newErrors.email = 'invalid';
    if (phone.length < 10) newErrors.phone = 'min 10';
    if (website && !website.startsWith('http')) newErrors.website = 'invalid URL';
    if (address.length < 5) newErrors.address = 'min 5';
    if (city.length < 2) newErrors.city = 'min 2';
    if (postalCode && !/^\d{5}$/.test(postalCode)) newErrors.postalCode = '5 digits';
    if (acceptedPets.length === 0) newErrors.acceptedPets = 'required';
    if (!privacyConsent) newErrors.privacyConsent = 'required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function toggleCategory(cat: string) {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  function togglePet(pet: string) {
    setAcceptedPets((prev) =>
      prev.includes(pet) ? prev.filter((p) => p !== pet) : [...prev, pet],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await submitProviderApplication({
        businessName,
        categories,
        shortDescription,
        contactName,
        email,
        phone,
        website,
        address,
        city,
        area,
        postalCode,
        acceptedPets,
        privacyConsent,
        honeypot,
      });

      setResult(res);
    } catch {
      setResult({ error: 'server_error' });
    } finally {
      setLoading(false);
    }
  }

  if (result && 'success' in result) {
    return (
      <div className="mx-auto max-w-2xl">
        <Alert variant="success" title={t('success')}>
          {t('successDetail')}
        </Alert>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-10">
      {result && 'error' in result && (
        <Alert variant="danger">
          {result.error === 'rate_limited' ? t('rateLimited') : t('error')}
        </Alert>
      )}

      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="website_url_confirm"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* ===== Business Info ===== */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          {t('businessInfo')}
        </legend>
        <div className="space-y-4">
          <Input
            id="businessName"
            label={t('businessName')}
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            error={errors.businessName}
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('category')} <span className="text-danger-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                    categories.includes(cat)
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400'
                      : 'border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-surface-400 dark:text-slate-400 dark:hover:bg-surface-200'
                  }`}
                >
                  {t(`categories.${cat}`)}
                </button>
              ))}
            </div>
            {errors.categories && (
              <p className="mt-1 text-xs text-danger-500">{errors.categories}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="shortDescription"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {t('shortDescription')} <span className="text-danger-500">*</span>
            </label>
            <textarea
              id="shortDescription"
              rows={3}
              maxLength={300}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors placeholder:text-slate-400 dark:bg-surface-100 dark:text-slate-200 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.shortDescription
                  ? 'border-danger-500'
                  : 'border-slate-300 dark:border-surface-400'
              }`}
            />
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              {t('shortDescriptionHint')} ({shortDescription.length}/300)
            </p>
            {errors.shortDescription && (
              <p className="mt-1 text-xs text-danger-500">{errors.shortDescription}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* ===== Contact Info ===== */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          {t('contactInfo')}
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="contactName"
            label={t('contactName')}
            required
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            error={errors.contactName}
          />
          <Input
            id="email"
            type="email"
            label={t('email')}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            id="phone"
            type="tel"
            label={t('phone')}
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
          />
          <Input
            id="website"
            type="url"
            label={t('website')}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            error={errors.website}
            placeholder="https://"
          />
        </div>
      </fieldset>

      {/* ===== Location ===== */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          {t('locationInfo')}
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              id="address"
              label={t('address')}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={errors.address}
            />
          </div>
          <Input
            id="city"
            label={t('city')}
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={errors.city}
          />
          <Input
            id="area"
            label={t('area')}
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
          <Input
            id="postalCode"
            label={t('postalCode')}
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            error={errors.postalCode}
          />
        </div>
      </fieldset>

      {/* ===== Pet Details ===== */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          {t('petDetails')}
        </legend>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            {t('acceptedPets')} <span className="text-danger-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {PET_TYPES.map((pet) => (
              <label
                key={pet}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={acceptedPets.includes(pet)}
                  onChange={() => togglePet(pet)}
                  className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500 dark:border-surface-400"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {t(pet)}
                </span>
              </label>
            ))}
          </div>
          {errors.acceptedPets && (
            <p className="mt-1 text-xs text-danger-500">{errors.acceptedPets}</p>
          )}
        </div>
      </fieldset>

      {/* ===== Privacy Consent ===== */}
      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500 dark:border-surface-400"
          />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {t.rich('privacyConsent', {
              link: (chunks) => (
                <Link
                  href="/trust-center/privacy-policy"
                  className="text-primary-500 underline hover:text-primary-600"
                >
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="mt-1 text-xs text-danger-500">{errors.privacyConsent}</p>
        )}
      </div>

      {/* ===== Submit ===== */}
      <Button type="submit" size="lg" loading={loading} className="w-full">
        {t('submit')}
      </Button>
    </form>
  );
}
