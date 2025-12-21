import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Scale, Truck } from 'lucide-react';
import { getWeightEstimate } from '@/data/marketData';

interface QuantityInputProps {
  value: number;
  unit: 'quintals' | 'tons';
  onValueChange: (value: number) => void;
  onUnitChange: (unit: 'quintals' | 'tons') => void;
}

export function QuantityInput({
  value,
  unit,
  onValueChange,
  onUnitChange,
}: QuantityInputProps) {
  const [estimate, setEstimate] = useState('');

  useEffect(() => {
    if (value > 0) {
      setEstimate(getWeightEstimate(value, unit));
    } else {
      setEstimate('');
    }
  }, [value, unit]);

  return (
    <div className="space-y-2">
      <Label htmlFor="quantity" className="text-base font-semibold flex items-center gap-2">
        <Scale className="h-5 w-5 text-primary" />
        Quantity
      </Label>
      
      <div className="flex gap-2">
        <Input
          id="quantity"
          type="number"
          inputMode="decimal"
          min={0}
          step={0.1}
          placeholder="Enter amount"
          value={value || ''}
          onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
          className="touch-target text-lg font-semibold flex-1 bg-card border-2 border-input"
        />
        
        <ToggleGroup
          type="single"
          value={unit}
          onValueChange={(val) => val && onUnitChange(val as 'quintals' | 'tons')}
          className="bg-muted rounded-md"
        >
          <ToggleGroupItem 
            value="quintals" 
            className="touch-target px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            Qt
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="tons"
            className="touch-target px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            Ton
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {estimate && (
        <p className="text-sm text-muted-foreground flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <Truck className="h-4 w-4" />
          {estimate}
        </p>
      )}
    </div>
  );
}
