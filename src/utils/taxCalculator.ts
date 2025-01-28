import { getCountryTaxRules } from './taxRules';
import type { Trade } from '@/types/tax';

export const calculateTaxableEvents = (trades: Trade[], countryCode: string = 'IE'): Trade[] => {
  const rules = getCountryTaxRules(countryCode);
  
  return trades.map(trade => ({
    ...trade,
    // A trade is taxable if any rule marks it as taxable
    taxable: rules.some(rule => rule.calculateTax(trade))
  }));
};