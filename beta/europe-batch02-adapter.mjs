import { EUROPE_BATCH02, EUROPE_BATCH02_REFERENCE_DB } from './europe-batch02-reference.mjs';

export const batch02ByCountry = new Map(
  EUROPE_BATCH02.map(country => [
    country.country,
    {
      ...country,
      database: EUROPE_BATCH02_REFERENCE_DB.filter(
        row => row.country === country.country
      ),
    },
  ])
);

export function getBatch02CountryCandidates(country, currency = '') {
  const normalizedCountry = String(country || '').toLowerCase();
  const normalizedCurrency = String(currency || '').toLowerCase();

  return [...batch02ByCountry.values()].filter(item => {
    const countryMatch = item.aliases.some(alias =>
      normalizedCountry.includes(String(alias).toLowerCase())
    );
    const currencyMatch = normalizedCurrency &&
      (normalizedCurrency.includes(item.currency.toLowerCase()) ||
       item.currency.toLowerCase().includes(normalizedCurrency));

    return countryMatch || currencyMatch;
  });
}

export function getBatch02Rows(country) {
  return batch02ByCountry.get(country)?.database || [];
}
