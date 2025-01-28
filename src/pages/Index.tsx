import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { TradesTable } from "@/components/TradesTable";
import { TaxSummary } from "@/components/TaxSummary";
import { calculateTaxableEvents } from "@/utils/taxCalculator";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

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

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4 mb-4 p-4 bg-blue-50 rounded-lg">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-2">Expected CSV Format:</p>
                <p>Your CSV file should include the following columns:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><code className="bg-gray-100 px-1.5 py-0.5 rounded">date</code> - Transaction date (YYYY-MM-DD)</li>
                  <li><code className="bg-gray-100 px-1.5 py-0.5 rounded">type</code> - Transaction type (buy/sell)</li>
                  <li><code className="bg-gray-100 px-1.5 py-0.5 rounded">symbol</code> - Stock symbol</li>
                  <li><code className="bg-gray-100 px-1.5 py-0.5 rounded">quantity</code> - Number of shares</li>
                  <li><code className="bg-gray-100 px-1.5 py-0.5 rounded">price</code> - Price per share</li>
                  <li><code className="bg-gray-100 px-1.5 py-0.5 rounded">total</code> - Total transaction value</li>
                </ul>
                <div className="mt-4 p-4 bg-white rounded border border-gray-200">
                  <p className="font-medium text-gray-900 mb-2">Example CSV Content:</p>
                  <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
date,type,symbol,quantity,price,total
2024-01-15,buy,AAPL,10,190.50,1905.00
2024-02-01,buy,GOOGL,5,142.75,713.75
2024-02-15,sell,AAPL,5,195.25,976.25
2024-03-01,buy,MSFT,8,420.30,3362.40
2024-03-15,sell,GOOGL,2,145.80,291.60</pre>
                </div>
                <p className="mt-4 text-sm text-gray-500">Note: Save this as a .csv file with the exact column names shown above.</p>
              </div>
            </div>
            <FileUpload onDataLoaded={handleDataLoaded} />
          </CardContent>
        </Card>

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