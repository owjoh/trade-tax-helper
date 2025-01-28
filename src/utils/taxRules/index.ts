import { irishTaxRules } from './irish';
import type { TaxRule } from '@/types/tax';

export const taxRules: Record<string, TaxRule[]> = {
  IE: irishTaxRules,
  // Add more countries here as needed
  // US: usTaxRules,
  // UK: ukTaxRules,
};

export const getCountryTaxRules = (countryCode: string): TaxRule[] => {
  return taxRules[countryCode] || [];
};