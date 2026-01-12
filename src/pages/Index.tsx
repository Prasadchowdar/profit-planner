import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CropSelector } from '@/components/CropSelector';
import { QuantityInput } from '@/components/QuantityInput';
import { LocationSelector } from '@/components/LocationSelector';
import { HarvestStatusToggle } from '@/components/HarvestStatusToggle';
import { WinnerCard } from '@/components/WinnerCard';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ActionChecklist } from '@/components/ActionChecklist';
import { LoadingAnalysis } from '@/components/LoadingAnalysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { calculateProfits, CalculationResult, getGoogleMapsUrl } from '@/lib/calculations';
import { Crop, LOCATIONS } from '@/data/marketData';
import { Search, RotateCcw, Leaf } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { validateCalculationHistory, isJsonSizeValid, VALIDATION_LIMITS } from '@/lib/validation';

type ViewState = 'input' | 'loading' | 'results';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // Form state
  const [crop, setCrop] = useState<Crop | ''>('');
  const [quantity, setQuantity] = useState<number>(10);
  const [unit, setUnit] = useState<'quintals' | 'tons'>('quintals');
  const [location, setLocation] = useState<string>('');
  const [isHarvested, setIsHarvested] = useState<boolean>(true);

  // View state
  const [viewState, setViewState] = useState<ViewState>('input');
  const [results, setResults] = useState<CalculationResult[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleAnalyze = async () => {
    if (!crop || !location || quantity <= 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before analyzing.",
        variant: "destructive",
      });
      return;
    }

    // Validate quantity limits
    if (quantity > VALIDATION_LIMITS.MAX_QUANTITY) {
      toast({
        title: "Invalid Quantity",
        description: `Quantity cannot exceed ${VALIDATION_LIMITS.MAX_QUANTITY}`,
        variant: "destructive",
      });
      return;
    }

    setViewState('loading');

    // Simulate analysis time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const calculatedResults = calculateProfits({
      crop,
      quantity,
      quantityUnit: unit,
      location,
    });

    setResults(calculatedResults);

    // Save to history if user is logged in
    if (user && calculatedResults.length > 0) {
      const best = calculatedResults[0];
      
      // Prepare data for validation
      const historyData = {
        user_id: user.id,
        crop,
        quantity,
        quantity_unit: unit,
        location,
        best_market: best.market.marketName,
        net_profit: best.netProfit,
        all_results: calculatedResults,
      };

      // Validate data before insert
      const validationResult = validateCalculationHistory(historyData);
      
      if (!validationResult.success) {
        console.error('Validation failed:', validationResult.error.errors);
        toast({
          title: "Validation Error",
          description: "Failed to save calculation - invalid data",
          variant: "destructive",
        });
      } else if (!isJsonSizeValid(calculatedResults)) {
        console.error('Results data too large to store');
        toast({
          title: "Data Error",
          description: "Calculation results too large to save",
          variant: "destructive",
        });
      } else {
        // Data is valid, proceed with insert
        const { error } = await supabase.from('calculation_history').insert([{
          user_id: user.id,
          crop,
          quantity,
          quantity_unit: unit,
          location,
          best_market: best.market.marketName,
          net_profit: best.netProfit,
          all_results: JSON.parse(JSON.stringify(calculatedResults)),
        }]);
        if (error) {
          // Only log detailed errors in development to prevent information leakage
          if (import.meta.env.DEV) {
            console.error('Failed to save calculation history:', error);
          }
          toast({
            title: "Save Error",
            description: "Unable to save calculation to history.",
            variant: "destructive",
          });
        }
      }
    }

    setViewState('results');
  };

  const handleReset = () => {
    setViewState('input');
    setResults([]);
    setCrop('');
    setQuantity(10);
    setUnit('quintals');
    setLocation('');
    setIsHarvested(true);
  };

  const handleHistoryClick = () => {
    navigate('/history');
  };

  // Calculate mapsUrl for ActionChecklist
  const getMapsUrl = () => {
    if (results.length === 0) return null;
    const winner = results[0];
    if (winner.market.distanceKm === 0) return null;
    
    const userLocation = LOCATIONS.find(l => l.id === location);
    if (!userLocation) return null;
    
    return getGoogleMapsUrl(
      userLocation.latitude,
      userLocation.longitude,
      winner.market.latitude,
      winner.market.longitude
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onHistoryClick={handleHistoryClick} />

      <main className="container max-w-2xl mx-auto px-4 py-6 pb-24">
        {viewState === 'input' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Find Your Best Market
              </h1>
              <p className="text-muted-foreground">
                Compare prices, transport costs & maximize your profit
              </p>
            </div>

            {/* Input Card */}
            <Card className="border-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Crop Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <CropSelector value={crop} onChange={(val) => setCrop(val as Crop)} />
                
                <QuantityInput
                  value={quantity}
                  unit={unit}
                  onValueChange={setQuantity}
                  onUnitChange={setUnit}
                />

                <LocationSelector value={location} onChange={setLocation} />

                <HarvestStatusToggle isReady={isHarvested} onChange={setIsHarvested} />

                <Button 
                  onClick={handleAnalyze}
                  className="w-full touch-target text-lg font-semibold"
                  size="lg"
                  disabled={!crop || !location || quantity <= 0}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Find Best Market
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {viewState === 'loading' && <LoadingAnalysis />}

        {viewState === 'results' && results.length > 0 && (
          <div className="space-y-6">
            {/* Winner Card */}
            <WinnerCard
              winner={results[0]}
              runnerUp={results[1]}
              userLocationId={location}
              crop={crop as Crop}
              quantity={quantity}
              quantityUnit={unit}
            />

            {/* Comparison Table */}
            <ComparisonTable results={results} />

            {/* Action Checklist */}
            <ActionChecklist 
              mapsUrl={getMapsUrl()} 
              marketName={results[0]?.market.marketName}
            />

            {/* Reset Button */}
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full touch-target"
              size="lg"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              New Analysis
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
