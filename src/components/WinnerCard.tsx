import { Trophy, TrendingUp, MapPin, ExternalLink, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalculationResult, formatCurrency, getRecommendationReason, getGoogleMapsUrl } from '@/lib/calculations';
import { LOCATIONS } from '@/data/marketData';
import { toast } from '@/hooks/use-toast';

interface WinnerCardProps {
  winner: CalculationResult;
  runnerUp: CalculationResult | undefined;
  userLocationId: string;
}

export function WinnerCard({ winner, runnerUp, userLocationId }: WinnerCardProps) {
  const userLocation = LOCATIONS.find(l => l.id === userLocationId);
  const reason = getRecommendationReason(winner, runnerUp);
  
  const mapsUrl = userLocation 
    ? getGoogleMapsUrl(
        userLocation.latitude,
        userLocation.longitude,
        winner.market.latitude,
        winner.market.longitude
      )
    : null;

  const handleNavigate = () => {
    if (!mapsUrl) return;
    
    const newWindow = window.open(mapsUrl, '_blank');
    
    if (!newWindow || newWindow.closed) {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(mapsUrl).then(() => {
        toast({
          title: "Link Copied!",
          description: "Google Maps link copied. Paste it in a new browser tab.",
        });
      });
    }
  };

  const handleCopyLink = () => {
    if (!mapsUrl) return;
    navigator.clipboard.writeText(mapsUrl).then(() => {
      toast({
        title: "Directions Copied!",
        description: "Share with your driver or paste in browser.",
      });
    });
  };

  return (
    <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary text-primary-foreground rounded-full">
              <Trophy className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">Best Market</CardTitle>
          </div>
          <Badge 
            variant="outline" 
            className={`
              ${winner.market.riskFactor === 'Low' ? 'risk-low' : ''}
              ${winner.market.riskFactor === 'Medium' ? 'risk-medium' : ''}
              ${winner.market.riskFactor === 'High' ? 'risk-high' : ''}
              border
            `}
          >
            {winner.market.riskFactor} Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {winner.market.marketName}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {winner.market.distanceKm > 0 
              ? `${winner.market.distanceKm} km away • ${winner.market.operatingHours}`
              : winner.market.operatingHours
            }
          </p>
        </div>

        <div className="bg-card rounded-xl p-4 border-2 border-success/30">
          <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-success" />
            Your Net Profit
          </p>
          <p className="text-4xl font-extrabold text-success price-display">
            {formatCurrency(winner.netProfit)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {winner.profitMargin.toFixed(1)}% margin
          </p>
        </div>

        <p className="text-base font-medium text-foreground bg-accent/50 p-3 rounded-lg">
          💡 {reason}
        </p>

        {mapsUrl && winner.market.distanceKm > 0 && (
          <div className="flex gap-2">
            <Button 
              className="flex-1 touch-target text-base font-semibold"
              onClick={handleNavigate}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Navigate to Market
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
              title="Copy directions link"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
