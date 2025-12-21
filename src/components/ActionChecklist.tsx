import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, Truck, FileText, Navigation, ExternalLink, Copy, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ActionChecklistProps {
  mapsUrl?: string | null;
  marketName?: string;
}

export function ActionChecklist({ mapsUrl, marketName }: ActionChecklistProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [showTruckDialog, setShowTruckDialog] = useState(false);

  const handleNavigate = () => {
    if (!mapsUrl) {
      toast({
        title: "No Navigation Available",
        description: "Navigation is not available for Farm Gate Pickup.",
      });
      return;
    }

    // Try to open in new tab
    const newWindow = window.open(mapsUrl, '_blank');
    
    // If blocked (e.g., in iframe), copy to clipboard
    if (!newWindow || newWindow.closed) {
      navigator.clipboard.writeText(mapsUrl).then(() => {
        toast({
          title: "Link Copied!",
          description: "Google Maps link copied. Paste it in a new browser tab.",
        });
      }).catch(() => {
        toast({
          title: "Navigation Blocked",
          description: "Please copy this link manually: " + mapsUrl,
          variant: "destructive",
        });
      });
    } else {
      setCompleted(prev => ({ ...prev, navigate: true }));
      toast({
        title: "Opening Google Maps",
        description: `Navigating to ${marketName || 'market'}...`,
      });
    }
  };

  const handleCopyLink = () => {
    if (!mapsUrl) return;
    navigator.clipboard.writeText(mapsUrl).then(() => {
      toast({
        title: "Link Copied!",
        description: "Paste it in your browser or share with your driver.",
      });
    });
  };

  const handleBookTruck = () => {
    setShowTruckDialog(true);
    setCompleted(prev => ({ ...prev, truck: true }));
  };

  const handlePrintBill = () => {
    setCompleted(prev => ({ ...prev, bill: true }));
    toast({
      title: "Bill Template",
      description: "Opening print dialog...",
    });
    window.print();
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Book Mini-Truck */}
          <Button
            variant={completed.truck ? "outline" : "secondary"}
            className={`w-full justify-start gap-3 h-auto py-3 ${
              completed.truck ? 'bg-success/10 border-success/30 text-success' : ''
            }`}
            onClick={handleBookTruck}
          >
            <Truck className={`h-5 w-5 ${completed.truck ? 'text-success' : 'text-muted-foreground'}`} />
            <span className={completed.truck ? 'line-through' : ''}>
              Book Mini-Truck (2 Ton capacity)
            </span>
          </Button>

          {/* Print Bill */}
          <Button
            variant={completed.bill ? "outline" : "secondary"}
            className={`w-full justify-start gap-3 h-auto py-3 ${
              completed.bill ? 'bg-success/10 border-success/30 text-success' : ''
            }`}
            onClick={handlePrintBill}
          >
            <FileText className={`h-5 w-5 ${completed.bill ? 'text-success' : 'text-muted-foreground'}`} />
            <span className={completed.bill ? 'line-through' : ''}>
              Print/Write Bill of Sale
            </span>
          </Button>

          {/* Navigate to Market */}
          <div className="flex gap-2">
            <Button
              variant={completed.navigate ? "outline" : "default"}
              className={`flex-1 justify-start gap-3 h-auto py-3 ${
                completed.navigate ? 'bg-success/10 border-success/30 text-success' : ''
              }`}
              onClick={handleNavigate}
              disabled={!mapsUrl}
            >
              <Navigation className={`h-5 w-5 ${completed.navigate ? 'text-success' : ''}`} />
              <span className={completed.navigate ? 'line-through' : ''}>
                {mapsUrl ? 'Navigate to Market' : 'No Navigation (Farm Gate)'}
              </span>
              {mapsUrl && <ExternalLink className="h-4 w-4 ml-auto" />}
            </Button>
            
            {mapsUrl && (
              <Button
                variant="outline"
                size="icon"
                className="h-auto py-3 px-3"
                onClick={handleCopyLink}
                title="Copy link"
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Truck Booking Dialog */}
      <Dialog open={showTruckDialog} onOpenChange={setShowTruckDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              Book Transport
            </DialogTitle>
            <DialogDescription>
              Contact local transport services for crop pickup
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium mb-2">Local Transport Services:</p>
              <div className="space-y-2">
                <a 
                  href="tel:+919876543210" 
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  Raju Transport: +91 98765 43210
                </a>
                <a 
                  href="tel:+919876543211" 
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  Krishna Logistics: +91 98765 43211
                </a>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              💡 Tip: Book at least 1 day in advance for better rates.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}