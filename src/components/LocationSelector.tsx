import { LOCATIONS } from '@/data/marketData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function LocationSelector({ value, onChange }: LocationSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        Your Location
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          id="location" 
          className="touch-target text-base bg-card border-2 border-input hover:border-primary/50 transition-colors"
        >
          <SelectValue placeholder="Select your village..." />
        </SelectTrigger>
        <SelectContent>
          {LOCATIONS.map((loc) => (
            <SelectItem 
              key={loc.id} 
              value={loc.id}
              className="text-base py-3"
            >
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {loc.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
