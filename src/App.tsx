import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, useAuth as useClerkAuth } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingSpinner } from "./components/common";
import { Button } from "@/components/ui/button";
import { AutoSeeder } from "@/components/AutoSeeder";

// Lazy load pages for better initial load performance
const Landing = lazy(() => import("./pages/Landing"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const LessonPlayer = lazy(() => import("./pages/LessonPlayer"));
const ModuleLearningHub = lazy(() => import("./pages/ModuleLearningHub"));
const ExamRunner = lazy(() => import("./pages/ExamRunner"));
const ExamCentre = lazy(() => import("./pages/ExamCentre"));
const ExamWorkspace = lazy(() => import("./pages/ExamWorkspace"));
const Playground = lazy(() => import("./pages/Playground"));
const Upgrade = lazy(() => import("./pages/Upgrade"));

// Loading spinner for lazy loaded components
function PageLoader() {
  return <LoadingSpinner fullScreen label="Loading page" />;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const clerkAuth = useClerkAuth();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const [timedOut, setTimedOut] = useState(false);
  const authStillLoading = !clerkAuth.isLoaded || isLoading;

  useEffect(() => {
    if (!authStillLoading) return;
    const id = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(id);
  }, [authStillLoading]);

  if (authStillLoading && !timedOut) {
    return <LoadingSpinner fullScreen label="Checking your account session" />;
  }

  if (timedOut && !clerkAuth.isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-lg rounded-lg border border-destructive/40 bg-card p-6 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-destructive">Authentication is taking too long to load</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Clerk did not finish loading in the browser. Privacy extensions, Brave Shields, or blocked
            third-party requests can cause this state.
          </p>
          <div className="mt-4 rounded-md border bg-background/60 p-3 text-left text-sm">
            <p><strong>Checks:</strong> Disable Shields or ad blockers for `localhost`, then reload.</p>
            <p><strong>Console hint:</strong> Look for blocked Clerk script or network requests.</p>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  if (timedOut && clerkAuth.isLoaded && clerkAuth.isSignedIn && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-lg rounded-lg border border-destructive/40 bg-card p-6 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-destructive">Unable to verify your Convex session</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Clerk finished loading, but Convex did not complete authentication for this session.
          </p>
          <div className="mt-4 rounded-md border bg-background/60 p-3 text-left text-sm">
            <p><strong>Backend:</strong> {import.meta.env.VITE_CONVEX_URL ?? "Not set"}</p>
            <p><strong>Check:</strong> Make sure `bunx convex dev` is still running and synced.</p>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AutoSeeder />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Courses />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:slug"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CourseDetail />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lesson/:lessonId"
            element={
              <ProtectedRoute>
                <LessonPlayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/module/:lessonId"
            element={
              <ProtectedRoute>
                <ModuleLearningHub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exams"
            element={
              <ProtectedRoute>
                <ExamCentre />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/:examId"
            element={
              <ProtectedRoute>
                <ExamRunner />
              </ProtectedRoute>
            }
          />
          <Route path="/exam-centre" element={<Navigate to="/exams" replace />} />
          <Route
            path="/exam-workspace/:examId"
            element={
              <ProtectedRoute>
                <ExamWorkspace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playground"
            element={
              <ProtectedRoute>
                <Playground />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upgrade"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Upgrade />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        <Route path="/pricing" element={<Navigate to="/upgrade" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
