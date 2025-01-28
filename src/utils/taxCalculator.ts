interface Trade {
  type: string;
  total: number;
  date: string;
}

export const calculateTaxableEvents = (trades: Trade[]): Trade[] => {
  // Basic Irish CGT rules implementation
  return trades.map(trade => ({
    ...trade,
    // Mark sells as taxable events (this is a simplified version)
    taxable: trade.type.toLowerCase() === 'sell'
  }));
};