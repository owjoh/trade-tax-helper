import type { TaxRule } from '@/types/tax';

export const irishTaxRules: TaxRule[] = [
  {
    id: 'ie-cgt-basic',
    name: 'Basic CGT Rule',
    country: 'IE',
    description: 'Standard Capital Gains Tax applies to profits from selling assets',
    calculateTax: (trade) => {
      // Current simple implementation - marks all sells as taxable
      return trade.type.toLowerCase() === 'sell';
    },
  },
  // Add more Irish tax rules here as needed
];