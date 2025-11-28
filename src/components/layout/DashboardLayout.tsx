import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Navbar } from "./Navbar";
import { TrialBanner } from "@/components/TrialBanner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoaded } = useUser();
  const getOrCreateUser = useMutation(api.users.getOrCreate);

  useEffect(() => {
    if (isLoaded && user) {
      getOrCreateUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name: user.fullName ?? user.firstName ?? "User",
        avatarUrl: user.imageUrl,
      });
    }
  }, [isLoaded, user, getOrCreateUser]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-6">
        <TrialBanner onUpgrade={() => window.open('/pricing', '_self')} />
        {children}
      </main>
    </div>
  );
}
