export interface TaxRule {
  id: string;
  name: string;
  country: string;
  description: string;
  calculateTax: (trade: Trade) => boolean;
}

export interface Trade {
  date: string;
  type: string;
  symbol: string;
  quantity: number;
  price: number;
  total: number;
  taxable?: boolean;
}

export interface TaxSummary {
  totalTrades: number;
  taxableEvents: number;
  totalValue: number;
}