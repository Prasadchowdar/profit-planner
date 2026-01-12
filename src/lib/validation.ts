import { z } from 'zod';
import { CROPS, LOCATIONS, Crop } from '@/data/marketData';

// Constants for validation limits
export const VALIDATION_LIMITS = {
  MAX_QUANTITY: 10000,
  MIN_QUANTITY: 0.01,
  MAX_FULL_NAME_LENGTH: 100,
  MAX_TEXT_LENGTH: 255,
  MAX_JSONB_SIZE: 50000, // 50KB max for JSONB field
} as const;

// Validation schema for calculation history insert
export const calculationHistorySchema = z.object({
  crop: z.string().refine(
    (val): val is Crop => CROPS.includes(val as Crop),
    { message: 'Invalid crop type' }
  ),
  quantity: z.number()
    .min(VALIDATION_LIMITS.MIN_QUANTITY, 'Quantity must be greater than 0')
    .max(VALIDATION_LIMITS.MAX_QUANTITY, `Quantity cannot exceed ${VALIDATION_LIMITS.MAX_QUANTITY}`),
  quantity_unit: z.enum(['quintals', 'tons'], { message: 'Invalid quantity unit' }),
  location: z.string().refine(
    (val) => LOCATIONS.some(l => l.id === val),
    { message: 'Invalid location' }
  ),
  best_market: z.string()
    .min(1, 'Best market is required')
    .max(VALIDATION_LIMITS.MAX_TEXT_LENGTH, 'Best market name too long'),
  net_profit: z.number().finite('Net profit must be a valid number'),
  all_results: z.array(z.object({
    market: z.object({
      id: z.string(),
      marketName: z.string(),
      crop: z.string(),
      pricePerQuintal: z.number(),
      distanceKm: z.number(),
      transportRatePerKm: z.number(),
      loadingFeePerQuintal: z.number(),
      riskFactor: z.enum(['Low', 'Medium', 'High']),
      latitude: z.number(),
      longitude: z.number(),
      operatingHours: z.string(),
    }),
    grossRevenue: z.number(),
    transportCost: z.number(),
    loadingCost: z.number(),
    netProfit: z.number(),
    profitPerQuintal: z.number(),
  })).max(20, 'Too many results'),
  user_id: z.string().uuid('Invalid user ID'),
});

// Validation schema for signup data
export const signupDataSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .max(VALIDATION_LIMITS.MAX_TEXT_LENGTH, 'Email too long'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(VALIDATION_LIMITS.MAX_TEXT_LENGTH, 'Password too long'),
  fullName: z.string()
    .max(VALIDATION_LIMITS.MAX_FULL_NAME_LENGTH, `Name cannot exceed ${VALIDATION_LIMITS.MAX_FULL_NAME_LENGTH} characters`)
    .optional()
    .transform(val => val?.trim()),
});

// Helper to validate calculation history data
export function validateCalculationHistory(data: unknown) {
  return calculationHistorySchema.safeParse(data);
}

// Helper to validate signup data
export function validateSignupData(data: { email: string; password: string; fullName?: string }) {
  return signupDataSchema.safeParse(data);
}

// Helper to check JSONB size
export function isJsonSizeValid(data: unknown): boolean {
  try {
    const jsonString = JSON.stringify(data);
    return jsonString.length <= VALIDATION_LIMITS.MAX_JSONB_SIZE;
  } catch {
    return false;
  }
}

// Sanitize string input (trim and limit length)
export function sanitizeString(input: string, maxLength: number = VALIDATION_LIMITS.MAX_TEXT_LENGTH): string {
  return input.trim().slice(0, maxLength);
}
