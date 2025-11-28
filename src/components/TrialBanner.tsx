import { Clock, Sparkles } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TrialBannerProps {
  onUpgrade?: () => void;
}

export function TrialBanner({ onUpgrade }: TrialBannerProps) {
  const { isLoading, status, daysRemaining, isTrialActive, isExpired } = useSubscription();

  if (isLoading) return null;

  // Don't show banner for active subscribers
  if (status === "active") return null;

  // Expired trial
  if (isExpired) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/20 rounded-full">
              <Clock className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-destructive">Your trial has expired</p>
              <p className="text-sm text-muted-foreground">
                Upgrade to continue accessing all features
              </p>
            </div>
          </div>
          <Button onClick={onUpgrade} variant="destructive" size="sm">
            Upgrade Now
          </Button>
        </div>
      </div>
    );
  }

  // Active trial
  if (isTrialActive) {
    const isUrgent = daysRemaining <= 7;
    
    return (
      <div className={`border rounded-lg p-4 mb-4 ${
        isUrgent 
          ? "bg-orange-500/10 border-orange-500/20" 
          : "bg-primary/10 border-primary/20"
      }`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              isUrgent ? "bg-orange-500/20" : "bg-primary/20"
            }`}>
              <Sparkles className={`h-4 w-4 ${
                isUrgent ? "text-orange-500" : "text-primary"
              }`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">Free Trial</p>
                <Badge variant={isUrgent ? "destructive" : "secondary"}>
                  {daysRemaining} {daysRemaining === 1 ? "day" : "days"} left
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {isUrgent 
                  ? "Your trial is ending soon. Upgrade to keep your progress!"
                  : "You have full access to all features during your trial"
                }
              </p>
            </div>
          </div>
          <Button 
            onClick={onUpgrade} 
            variant={isUrgent ? "default" : "outline"} 
            size="sm"
          >
            {isUrgent ? "Upgrade Now" : "View Plans"}
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
