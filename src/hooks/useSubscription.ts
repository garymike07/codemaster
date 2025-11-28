import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useSubscription() {
  const subscriptionStatus = useQuery(api.subscriptions.getSubscriptionStatus);

  const isLoading = subscriptionStatus === undefined;

  return {
    isLoading,
    status: subscriptionStatus?.status ?? null,
    plan: subscriptionStatus?.plan ?? null,
    daysRemaining: subscriptionStatus?.daysRemaining ?? 0,
    isTrialActive: subscriptionStatus?.isTrialActive ?? false,
    hasAccess: subscriptionStatus?.hasAccess ?? false,
    isExpired: subscriptionStatus?.isExpired ?? false,
    trialEndsAt: subscriptionStatus?.trialEndsAt ?? null,
  };
}

export function useHasAccess(feature?: string) {
  const accessCheck = useQuery(api.subscriptions.checkAccess, { feature });

  return {
    isLoading: accessCheck === undefined,
    hasAccess: accessCheck?.hasAccess ?? false,
    reason: accessCheck?.reason ?? null,
  };
}
