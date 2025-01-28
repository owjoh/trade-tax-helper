import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Trade } from "@/types/tax";

interface TradesTableProps {
  trades: Trade[];
}

export const TradesTable = ({ trades }: TradesTableProps) => {
  if (!trades.length) return null;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Taxable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono">{trade.date}</TableCell>
              <TableCell>{trade.type}</TableCell>
              <TableCell>{trade.symbol}</TableCell>
              <TableCell className="text-right font-mono">{trade.quantity}</TableCell>
              <TableCell className="text-right font-mono">€{trade.price.toFixed(2)}</TableCell>
              <TableCell className="text-right font-mono">€{trade.total.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                {trade.taxable ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-finance-amber text-white">
                    Taxable
                  </span>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};