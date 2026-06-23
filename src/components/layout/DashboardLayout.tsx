import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TrialBanner } from "@/components/TrialBanner";
import { Button } from "@/components/ui/button";
import { AutoSeeder } from "@/components/AutoSeeder";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoaded } = useUser();
  const getOrCreateUser = useMutation(api.users.getOrCreate);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      getOrCreateUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name: user.fullName ?? user.firstName ?? "User",
        avatarUrl: user.imageUrl,
      }).catch((err) => {
        console.error("Failed to initialize user profile:", err);
        setInitError("Failed to initialize user profile. Please refresh the page.");
      });
    }
  }, [isLoaded, user, getOrCreateUser]);

  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-500 mb-4">{initError}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AutoSeeder />
      <Navbar />
      <main className="container mx-auto px-4 py-6 flex-1">
        <TrialBanner />
        {children}
      </main>
      <Footer />
    </div>
  );
}
