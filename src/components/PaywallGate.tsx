import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { useHasAccess } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";

interface PaywallGateProps {
  children: ReactNode;
  feature?: string;
  fallback?: ReactNode;
  onUpgrade?: () => void;
}

export function PaywallGate({ 
  children, 
  feature, 
  fallback,
  onUpgrade 
}: PaywallGateProps) {
  const { isLoading, hasAccess, reason } = useHasAccess(feature);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  // Custom fallback
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default paywall UI
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg bg-muted/50">
      <div className="p-3 bg-muted rounded-full mb-4">
        <Lock className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Premium Feature</h3>
      <p className="text-muted-foreground text-center mb-4 max-w-sm">
        {reason === "trial_expired" 
          ? "Your trial has expired. Upgrade to access this feature."
          : "This feature requires an active subscription."
        }
      </p>
      <Button onClick={onUpgrade}>
        Upgrade to Premium
      </Button>
    </div>
  );
}

interface RequireAccessProps {
  children: ReactNode;
  feature?: string;
  redirect?: string;
}

export function RequireAccess({ children, feature }: RequireAccessProps) {
  const { isLoading, hasAccess } = useHasAccess(feature);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-md">
          <div className="p-4 bg-muted rounded-full inline-block mb-4">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Subscription Required</h1>
          <p className="text-muted-foreground mb-6">
            You need an active subscription to access this page.
          </p>
          <Button size="lg">
            View Pricing
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
