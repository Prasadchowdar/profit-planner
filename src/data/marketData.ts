// All 10 crops with realistic Telangana market data
export type Crop = 
  | 'Rice'
  | 'Wheat'
  | 'Millets'
  | 'Maize'
  | 'Pulses'
  | 'Sugarcane'
  | 'Cotton'
  | 'Jute'
  | 'Oilseeds'
  | 'Tea';

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface Market {
  id: string;
  marketName: string;
  crop: Crop;
  pricePerQuintal: number; // in INR
  distanceKm: number;
  transportRatePerKm: number; // INR per km
  loadingFeePerQuintal: number; // INR per quintal
  riskFactor: RiskLevel;
  latitude: number;
  longitude: number;
  operatingHours: string;
}

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export const LOCATIONS: Location[] = [
  { id: 'kothaguda', name: 'Kothaguda', latitude: 17.4526, longitude: 78.3792 },
  { id: 'shamshabad', name: 'Shamshabad', latitude: 17.2403, longitude: 78.4294 },
  { id: 'warangal', name: 'Warangal', latitude: 17.9689, longitude: 79.5941 },
];

export const CROPS: Crop[] = [
  'Rice',
  'Wheat',
  'Millets',
  'Maize',
  'Pulses',
  'Sugarcane',
  'Cotton',
  'Jute',
  'Oilseeds',
  'Tea',
];

// Market data for all crops
export const MARKET_DATA: Market[] = [
  // Rice markets
  {
    id: 'rice-bowenpally',
    marketName: 'Bowenpally Mandi',
    crop: 'Rice',
    pricePerQuintal: 2400,
    distanceKm: 40,
    transportRatePerKm: 35,
    loadingFeePerQuintal: 50,
    riskFactor: 'Low',
    latitude: 17.4725,
    longitude: 78.4469,
    operatingHours: '6:00 AM - 6:00 PM',
  },
  {
    id: 'rice-gajwel',
    marketName: 'Gajwel Market',
    crop: 'Rice',
    pricePerQuintal: 2200,
    distanceKm: 15,
    transportRatePerKm: 25,
    loadingFeePerQuintal: 40,
    riskFactor: 'Low',
    latitude: 17.8535,
    longitude: 78.6826,
    operatingHours: '7:00 AM - 5:00 PM',
  },
  {
    id: 'rice-farmgate',
    marketName: 'Farm Gate Pickup',
    crop: 'Rice',
    pricePerQuintal: 1900,
    distanceKm: 0,
    transportRatePerKm: 0,
    loadingFeePerQuintal: 20,
    riskFactor: 'Low',
    latitude: 17.4526,
    longitude: 78.3792,
    operatingHours: 'On Demand',
  },

  // Wheat markets
  {
    id: 'wheat-erragadda',
    marketName: 'Erragadda Market',
    crop: 'Wheat',
    pricePerQuintal: 2800,
    distanceKm: 35,
    transportRatePerKm: 32,
    loadingFeePerQuintal: 45,
    riskFactor: 'Low',
    latitude: 17.4532,
    longitude: 78.4276,
    operatingHours: '6:00 AM - 5:00 PM',
  },
  {
    id: 'wheat-nizamabad',
    marketName: 'Nizamabad APMC',
    crop: 'Wheat',
    pricePerQuintal: 2950,
    distanceKm: 175,
    transportRatePerKm: 28,
    loadingFeePerQuintal: 55,
    riskFactor: 'High',
    latitude: 18.6725,
    longitude: 78.0940,
    operatingHours: '5:00 AM - 4:00 PM',
  },
  {
    id: 'wheat-farmgate',
    marketName: 'Farm Gate Pickup',
    crop: 'Wheat',
    pricePerQuintal: 2500,
    distanceKm: 0,
    transportRatePerKm: 0,
    loadingFeePerQuintal: 20,
    riskFactor: 'Low',
    latitude: 17.4526,
    longitude: 78.3792,
    operatingHours: 'On Demand',
  },

  // Millets markets
  {
    id: 'millets-sangareddy',
    marketName: 'Sangareddy Mandi',
    crop: 'Millets',
    pricePerQuintal: 3200,
    distanceKm: 55,
    transportRatePerKm: 30,
    loadingFeePerQuintal: 40,
    riskFactor: 'Medium',
    latitude: 17.6249,
    longitude: 78.0866,
    operatingHours: '6:00 AM - 5:00 PM',
  },
  {
    id: 'millets-mahbubnagar',
    marketName: 'Mahbubnagar APMC',
    crop: 'Millets',
    pricePerQuintal: 3400,
    distanceKm: 100,
    transportRatePerKm: 28,
    loadingFeePerQuintal: 50,
    riskFactor: 'Medium',
    latitude: 16.7372,
    longitude: 77.9850,
    operatingHours: '5:30 AM - 4:30 PM',
  },
  {
    id: 'millets-farmgate',
    marketName: 'Farm Gate Pickup',
    crop: 'Millets',
    pricePerQuintal: 2800,
    distanceKm: 0,
    transportRatePerKm: 0,
    loadingFeePerQuintal: 20,
    riskFactor: 'Low',
    latitude: 17.4526,
    longitude: 78.3792,
    operatingHours: 'On Demand',
  },

  // Maize markets
  {
    id: 'maize-karimnagar',
    marketName: 'Karimnagar Yard',
    crop: 'Maize',
    pricePerQuintal: 2100,
    distanceKm: 165,
    transportRatePerKm: 26,
    loadingFeePerQuintal: 45,
    riskFactor: 'High',
    latitude: 18.4386,
    longitude: 79.1288,
    operatingHours: '6:00 AM - 6:00 PM',
  },
  {
    id: 'maize-medak',
    marketName: 'Medak Market',
    crop: 'Maize',
    pricePerQuintal: 1950,
    distanceKm: 95,
    transportRatePerKm: 28,
    loadingFeePerQuintal: 40,
    riskFactor: 'Medium',
    latitude: 18.0459,
    longitude: 78.2641,
    operatingHours: '5:30 AM - 5:00 PM',
  },
  {
    id: 'maize-farmgate',
    marketName: 'Farm Gate Pickup',
    crop: 'Maize',
    pricePerQuintal: 1700,
    distanceKm: 0,
    transportRatePerKm: 0,
    loadingFeePerQuintal: 20,
    riskFactor: 'Low',
    latitude: 17.4526,
    longitude: 78.3792,
    operatingHours: 'On Demand',
  },

  // Pulses markets
  {
    id: 'pulses-adilabad',
    marketName: 'Adilabad APMC',
    crop: 'Pulses',
    pricePerQuintal: 7200,
    distanceKm: 300,
    transportRatePerKm: 25,
    loadingFeePerQuintal: 60,
    riskFactor: 'High',
    latitude: 19.6641,
    longitude: 78.5320,
    operatingHours: '5:00 AM - 4:00 PM',
  },
  {
    id: 'pulses-bowenpally',
    marketName: 'Bowenpally Mandi',
    crop: 'Pulses',
    pricePerQuintal: 6800,
    distanceKm: 40,
    transportRatePerKm: 35,
    loadingFeePerQuintal: 50,
    riskFactor: 'Low',
    latitude: 17.4725,
    longitude: 78.4469,
    operatingHours: '6:00 AM - 6:00 PM',
  },
  {
    id: 'pulses-farmgate',
    marketName: 'Farm Gate Pickup',
    crop: 'Pulses',
    pricePerQuintal: 6200,
    distanceKm: 0,
    transportRatePerKm: 0,
    loadingFeePerQuintal: 25,
    riskFactor: 'Low',
    latitude: 17.4526,
    longitude: 78.3792,
    operatingHours: 'On Demand',
  },

  // Sugarcane markets
  {
    id: 'sugarcane-nizam',
    marketName: 'Nizam Sugar Factory',
    crop: 'Sugarcane',
    pricePerQuintal: 350,
    distanceKm: 120,
    transportRatePerKm: 22,
    loadingFeePerQuintal: 30,
    riskFactor: 'Medium',
    latitude: 17.9932,
    longitude: 79.5587,
    operatingHours: '24/7 during season',
  },
  {
    id: 'sugarcane-medak',
    marketName: 'Medak Cooperative',
    crop: 'Sugarcane',
    pricePerQuintal: 320,
    distanceKm: 95,
    transportRatePerKm: 24,
    loadingFeePerQuintal: 25,
    riskFactor: 'Medium',
    latitude: 18.0459,
    longitude: 78.2641,
    operatingHours: '6:00 AM - 8:00 PM',
  },
  {
    id: 'sugarcane-farmgate',
    marketName: 'Farm Gate Pickup',
    crop: 'Sugarcane',
    pricePerQuintal: 280,
    distanceKm: 0,
    transportRatePerKm: 0,
    loadingFeePerQuintal: 15,
    riskFactor: 'Low',
    latitude: 17.4526,
    longitude: 78.3792,
    operatingHours: 'On Demand',
  },

  // Cotton markets
  {
    id: 'cotton-adilabad',
    marketName: 'Adilabad Cotton Yard',
    crop: 'Cotton',
    pricePerQuintal: 6500,
    distanceKm: 300,
    transportRatePerKm: 25,
    loadingFeePerQuintal: 70,
    riskFactor: 'High',
    latitude: 19.6641,
    longitude: 78.5320,
    operatingHours: '5:00 AM - 5:00 PM',
  },
  {
    id: 'cotton-warangal',
    marketName: 'Warangal CCI',
    crop: 'Cotton',
    pricePerQuintal: 6200,
    distanceKm: 140,
    transportRatePerKm: 28,
    loadingFeePerQuintal: 60,
    riskFactor: 'Medium',
    latitude: 17.9689,
    longitude: 79.5941,
    operatingHours: '6:00 AM - 6:00 PM',
  },
  {
    id: 'cotton-farmgate',
    marketName: 'Farm Gate Pickup',
    crop: 'Cotton',
    pricePerQuintal: 5800,
    distanceKm: 0,
    transportRatePerKm: 0,
    loadingFeePerQuintal: 30,
    riskFactor: 'Low',
    latitude: 17.4526,
    longitude: 78.3792,
    operatingHours: 'On Demand',
  },

  // Jute markets
  {
    id: 'jute-kolkata',
    marketName: 'Kolkata Jute Mills',
    crop: 'Jute',
    pricePerQuintal: 5500,
    distanceKm: 1500,
    transportRatePerKm: 18,
    loadingFeePerQuintal: 80,
    riskFactor: 'High',
    latitude: 22.5726,
    longitude: 88.3639,
    operatingHours: '8:00 AM - 5:00 PM',
  },
  {
    id: 'jute-visakhapatnam',
    marketName: 'Vizag Port Yard',
    crop: 'Jute',
    pricePerQuintal: 5000,
    distanceKm: 620,
    transportRatePerKm: 20,
    loadingFeePerQuintal: 65,
    riskFactor: 'High',
    latitude: 17.6868,
    longitude: 83.2185,
    operatingHours: '6:00 AM - 6:00 PM',
  },
  {
    id: 'jute-farmgate',
    marketName: 'Farm Gate Pickup',
    crop: 'Jute',
    pricePerQuintal: 4200,
    distanceKm: 0,
    transportRatePerKm: 0,
    loadingFeePerQuintal: 25,
    riskFactor: 'Low',
    latitude: 17.4526,
    longitude: 78.3792,
    operatingHours: 'On Demand',
  },

  // Oilseeds markets
  {
    id: 'oilseeds-kurnool',
    marketName: 'Kurnool Oil Market',
    crop: 'Oilseeds',
    pricePerQuintal: 5800,
    distanceKm: 210,
    transportRatePerKm: 26,
    loadingFeePerQuintal: 55,
    riskFactor: 'High',
    latitude: 15.8281,
    longitude: 78.0373,
    operatingHours: '5:00 AM - 5:00 PM',
  },
  {
    id: 'oilseeds-secunderabad',
    marketName: 'Secunderabad Market',
    crop: 'Oilseeds',
    pricePerQuintal: 5400,
    distanceKm: 30,
    transportRatePerKm: 32,
    loadingFeePerQuintal: 45,
    riskFactor: 'Low',
    latitude: 17.4399,
    longitude: 78.4983,
    operatingHours: '6:00 AM - 6:00 PM',
  },
  {
    id: 'oilseeds-farmgate',
    marketName: 'Farm Gate Pickup',
    crop: 'Oilseeds',
    pricePerQuintal: 4900,
    distanceKm: 0,
    transportRatePerKm: 0,
    loadingFeePerQuintal: 25,
    riskFactor: 'Low',
    latitude: 17.4526,
    longitude: 78.3792,
    operatingHours: 'On Demand',
  },

  // Tea markets
  {
    id: 'tea-nilgiris',
    marketName: 'Nilgiris Auction',
    crop: 'Tea',
    pricePerQuintal: 18000,
    distanceKm: 750,
    transportRatePerKm: 22,
    loadingFeePerQuintal: 100,
    riskFactor: 'High',
    latitude: 11.4102,
    longitude: 76.6950,
    operatingHours: 'Auction Days Only',
  },
  {
    id: 'tea-coimbatore',
    marketName: 'Coimbatore Tea Market',
    crop: 'Tea',
    pricePerQuintal: 16500,
    distanceKm: 680,
    transportRatePerKm: 24,
    loadingFeePerQuintal: 90,
    riskFactor: 'High',
    latitude: 11.0168,
    longitude: 76.9558,
    operatingHours: '7:00 AM - 4:00 PM',
  },
  {
    id: 'tea-farmgate',
    marketName: 'Farm Gate Pickup',
    crop: 'Tea',
    pricePerQuintal: 14000,
    distanceKm: 0,
    transportRatePerKm: 0,
    loadingFeePerQuintal: 40,
    riskFactor: 'Low',
    latitude: 17.4526,
    longitude: 78.3792,
    operatingHours: 'On Demand',
  },
];

// Helper to get markets by crop
export function getMarketsByCrop(crop: Crop): Market[] {
  return MARKET_DATA.filter((m) => m.crop === crop);
}

// Weight estimation helper
export function getWeightEstimate(quantity: number, unit: 'quintals' | 'tons'): string {
  const quintals = unit === 'tons' ? quantity * 10 : quantity;
  
  if (quintals <= 5) return "About 1 small tempo load";
  if (quintals <= 15) return "About 1 mini-truck (2 ton)";
  if (quintals <= 40) return "About 1 standard truck (4 ton)";
  if (quintals <= 100) return "About 1 large truck (10 ton)";
  return `About ${Math.ceil(quintals / 100)} large truck loads`;
}
