import { Crop, CROPS } from '@/data/marketData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Wheat } from 'lucide-react';

interface CropSelectorProps {
  value: Crop | '';
  onChange: (value: Crop) => void;
}

const cropIcons: Record<Crop, string> = {
  Rice: '🌾',
  Wheat: '🌾',
  Millets: '🌿',
  Maize: '🌽',
  Pulses: '🫘',
  Sugarcane: '🎋',
  Cotton: '☁️',
  Jute: '🧵',
  Oilseeds: '🥜',
  Tea: '🍵',
};

export function CropSelector({ value, onChange }: CropSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="crop" className="text-base font-semibold flex items-center gap-2">
        <Wheat className="h-5 w-5 text-primary" />
        Select Crop
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          id="crop" 
          className="touch-target text-base bg-card border-2 border-input hover:border-primary/50 transition-colors"
        >
          <SelectValue placeholder="Choose your crop..." />
        </SelectTrigger>
        <SelectContent>
          {CROPS.map((crop) => (
            <SelectItem 
              key={crop} 
              value={crop}
              className="text-base py-3"
            >
              <span className="flex items-center gap-2">
                <span>{cropIcons[crop]}</span>
                <span>{crop}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
