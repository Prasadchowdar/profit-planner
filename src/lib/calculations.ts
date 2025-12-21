import { Market, Crop, getMarketsByCrop, CROP_STORAGE_INFO } from '@/data/marketData';

export interface CalculationResult {
  market: Market;
  grossRevenue: number;
  transportCost: number;
  loadingCost: number;
  totalCost: number;
  netProfit: number;
  profitMargin: number;
  isHighRisk: boolean;
}

export interface AnalysisInput {
  crop: Crop;
  quantity: number;
  quantityUnit: 'quintals' | 'tons';
  location: string;
}

export function calculateProfits(input: AnalysisInput): CalculationResult[] {
  const { crop, quantity, quantityUnit } = input;
  
  // Convert to quintals if needed (1 ton = 10 quintals)
  const quantityInQuintals = quantityUnit === 'tons' ? quantity * 10 : quantity;
  
  const markets = getMarketsByCrop(crop);
  
  const results: CalculationResult[] = markets.map((market) => {
    // Calculate transport cost (round trip: distance * 2)
    const transportCost = market.distanceKm * 2 * market.transportRatePerKm;
    
    // Calculate loading/unloading cost
    const loadingCost = market.loadingFeePerQuintal * quantityInQuintals;
    
    // Total cost
    const totalCost = transportCost + loadingCost;
    
    // Gross revenue
    const grossRevenue = market.pricePerQuintal * quantityInQuintals;
    
    // Net profit
    const netProfit = grossRevenue - totalCost;
    
    // Profit margin percentage
    const profitMargin = (netProfit / grossRevenue) * 100;
    
    // High risk if distance > 50km
    const isHighRisk = market.distanceKm > 50;
    
    return {
      market,
      grossRevenue,
      transportCost,
      loadingCost,
      totalCost,
      netProfit,
      profitMargin,
      isHighRisk,
    };
  });
  
  // Sort by net profit (highest first)
  return results.sort((a, b) => b.netProfit - a.netProfit);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function getRecommendationReason(
  winner: CalculationResult,
  runnerUp: CalculationResult | undefined
): string {
  if (!runnerUp) {
    return `Best option available for your crop.`;
  }
  
  const profitDiff = winner.netProfit - runnerUp.netProfit;
  const transportSavings = runnerUp.transportCost - winner.transportCost;
  
  if (transportSavings > 0 && winner.market.distanceKm < runnerUp.market.distanceKm) {
    return `Sell at ${winner.market.marketName}. You save ${formatCurrency(transportSavings)} on transport.`;
  }
  
  if (winner.market.pricePerQuintal > runnerUp.market.pricePerQuintal) {
    const priceDiff = winner.market.pricePerQuintal - runnerUp.market.pricePerQuintal;
    return `${winner.market.marketName} pays ${formatCurrency(priceDiff)}/quintal more. Extra ${formatCurrency(profitDiff)} in your pocket.`;
  }
  
  if (winner.market.distanceKm === 0) {
    return `No transport needed. Keep ${formatCurrency(runnerUp.transportCost)} by selling at farm gate.`;
  }
  
  return `Best net profit. You earn ${formatCurrency(profitDiff)} more than the next option.`;
}

export function getGoogleMapsUrl(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${fromLat},${fromLng}&destination=${toLat},${toLng}&travelmode=driving`;
}

// Future potential analysis for Sell Now vs Sell Later
export interface FuturePotentialResult {
  isBetterLater: boolean;
  extraProfit: number; // Positive if storing is better, negative if selling now is better
  lossRisk: 'Low' | 'Medium' | 'High';
  futurePrice: number;
  saleableQuantity: number;
  storageCost: number;
  currentNetProfit: number;
  futureNetProfit: number;
}

export function analyzeFuturePotential(
  market: Market,
  crop: Crop,
  quantity: number,
  quantityUnit: 'quintals' | 'tons' = 'quintals'
): FuturePotentialResult {
  const quantityInQuintals = quantityUnit === 'tons' ? quantity * 10 : quantity;
  const storageInfo = CROP_STORAGE_INFO[crop];
  
  // Current profit calculation
  const currentPrice = market.pricePerQuintal;
  const transportCost = market.distanceKm * 2 * market.transportRatePerKm;
  const loadingCost = market.loadingFeePerQuintal * quantityInQuintals;
  const currentGrossRevenue = currentPrice * quantityInQuintals;
  const currentNetProfit = currentGrossRevenue - transportCost - loadingCost;
  
  // Future (next week) calculation
  const futurePrice = currentPrice * storageInfo.volatilityMultiplier;
  const saleableQuantity = quantityInQuintals * (1 - storageInfo.lossRatePerWeek);
  const storageCost = quantityInQuintals * storageInfo.storageCostPerQuintal;
  const futureGrossRevenue = futurePrice * saleableQuantity;
  const futureNetProfit = futureGrossRevenue - transportCost - loadingCost - storageCost;
  
  // Determine if waiting is beneficial
  const extraProfit = futureNetProfit - currentNetProfit;
  const isBetterLater = extraProfit > 0;
  
  // Assess risk based on loss rate
  let lossRisk: 'Low' | 'Medium' | 'High';
  if (storageInfo.lossRatePerWeek <= 0.02) {
    lossRisk = 'Low';
  } else if (storageInfo.lossRatePerWeek <= 0.05) {
    lossRisk = 'Medium';
  } else {
    lossRisk = 'High';
  }
  
  return {
    isBetterLater,
    extraProfit,
    lossRisk,
    futurePrice,
    saleableQuantity,
    storageCost,
    currentNetProfit,
    futureNetProfit,
  };
}
