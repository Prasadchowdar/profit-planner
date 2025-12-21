import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Clock } from 'lucide-react';

interface HarvestStatusToggleProps {
  isReady: boolean;
  onChange: (isReady: boolean) => void;
}

export function HarvestStatusToggle({ isReady, onChange }: HarvestStatusToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
      <div className="space-y-1">
        <Label htmlFor="harvest-status" className="text-base font-semibold flex items-center gap-2">
          {isReady ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <Clock className="h-5 w-5 text-warning" />
          )}
          Harvest Status
        </Label>
        <p className="text-sm text-muted-foreground">
          {isReady ? 'Harvested & Ready to Sell' : 'Still in Field'}
        </p>
      </div>
      <Switch
        id="harvest-status"
        checked={isReady}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-success"
      />
    </div>
  );
}
