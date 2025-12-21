import { CalculationResult, formatCurrency } from '@/lib/calculations';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, BarChart3 } from 'lucide-react';

interface ComparisonTableProps {
  results: CalculationResult[];
}

export function ComparisonTable({ results }: ComparisonTableProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          All Market Options
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Market</TableHead>
              <TableHead className="font-semibold text-right">Price/Qt</TableHead>
              <TableHead className="font-semibold text-right">Transport</TableHead>
              <TableHead className="font-semibold text-right">Net Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => (
              <TableRow 
                key={result.market.id}
                className={index === 0 ? 'bg-success/5' : ''}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <span className="text-success text-lg">🏆</span>
                    )}
                    <div>
                      <p className="font-semibold">{result.market.marketName}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          {result.market.distanceKm} km
                        </span>
                        {result.isHighRisk && (
                          <Badge variant="outline" className="risk-high text-xs px-1 py-0">
                            <AlertTriangle className="h-3 w-3 mr-0.5" />
                            Far
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatCurrency(result.market.pricePerQuintal)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatCurrency(result.totalCost)}
                </TableCell>
                <TableCell className={`text-right font-bold price-display text-lg ${
                  index === 0 ? 'text-success' : 'text-foreground'
                }`}>
                  {formatCurrency(result.netProfit)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
