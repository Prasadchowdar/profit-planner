import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ClipboardList, Truck, FileText, Navigation } from 'lucide-react';
import { useState } from 'react';

const ACTIONS = [
  {
    id: 'truck',
    label: 'Book Mini-Truck (2 Ton capacity)',
    icon: Truck,
  },
  {
    id: 'bill',
    label: 'Print/Write Bill of Sale',
    icon: FileText,
  },
  {
    id: 'navigate',
    label: 'Navigate to Market (Open Maps)',
    icon: Navigation,
  },
];

export function ActionChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          Action Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <div 
              key={action.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                checked[action.id] 
                  ? 'bg-success/10 border-success/30' 
                  : 'bg-card hover:bg-muted/50'
              }`}
              onClick={() => toggleCheck(action.id)}
            >
              <Checkbox 
                id={action.id}
                checked={checked[action.id] || false}
                onCheckedChange={() => toggleCheck(action.id)}
                className="data-[state=checked]:bg-success data-[state=checked]:border-success"
              />
              <Icon className={`h-5 w-5 ${checked[action.id] ? 'text-success' : 'text-muted-foreground'}`} />
              <Label 
                htmlFor={action.id}
                className={`flex-1 cursor-pointer ${checked[action.id] ? 'line-through text-muted-foreground' : ''}`}
              >
                {action.label}
              </Label>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
