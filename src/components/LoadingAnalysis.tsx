import { Loader2, TrendingUp, MapPin, Calculator } from 'lucide-react';

const steps = [
  { icon: MapPin, text: 'Finding markets near you...' },
  { icon: TrendingUp, text: 'Fetching current prices...' },
  { icon: Calculator, text: 'Calculating best profit...' },
];

export function LoadingAnalysis() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="relative bg-primary text-primary-foreground p-6 rounded-full">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-foreground mt-6 mb-4">
        Analyzing Market Routes...
      </h2>
      
      <div className="space-y-3 w-full max-w-xs">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div 
              key={index}
              className="flex items-center gap-3 text-muted-foreground animate-pulse"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm">{step.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
