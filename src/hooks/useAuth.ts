import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react';

export function useAuth() {
  const clerkAuth = useClerkAuth();
  const clerkUser = useUser();

  const isLoading = !clerkAuth.isLoaded || !clerkUser.isLoaded;
  const isAuthenticated = clerkAuth.isSignedIn && !!clerkUser.user;

  return {
    getToken: clerkAuth.getToken,
    isAuthenticated,
    isLoading,
    sessionId: clerkAuth.sessionId,
    signOut: clerkAuth.signOut,
    user: clerkUser.user ?? null,
    userId: clerkAuth.userId ?? null,
  };
}
