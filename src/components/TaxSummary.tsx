import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaxSummaryProps {
  totalTrades: number;
  taxableEvents: number;
  totalValue: number;
}

export const TaxSummary = ({ totalTrades, taxableEvents, totalValue }: TaxSummaryProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTrades}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxable Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-finance-amber">{taxableEvents}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-finance-green">€{totalValue.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
};