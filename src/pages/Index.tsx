import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { TradesTable } from "@/components/TradesTable";
import { TaxSummary } from "@/components/TaxSummary";
import { calculateTaxableEvents } from "@/utils/taxCalculator";

const Index = () => {
  const [trades, setTrades] = useState<any[]>([]);

  const handleDataLoaded = (data: any[]) => {
    const processedTrades = calculateTaxableEvents(data);
    setTrades(processedTrades);
  };

  const taxableEvents = trades.filter(t => t.taxable).length;
  const totalValue = trades.reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-finance-navy">Irish Trade Tax Calculator</h1>
          <p className="mt-2 text-gray-600">Import your trading data and identify taxable events</p>
        </div>

        <FileUpload onDataLoaded={handleDataLoaded} />

        {trades.length > 0 && (
          <>
            <TaxSummary
              totalTrades={trades.length}
              taxableEvents={taxableEvents}
              totalValue={totalValue}
            />
            <TradesTable trades={trades} />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;