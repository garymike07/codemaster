import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

function useForceUpdate() {
  const [, set] = useState(0);
  return () => set((n) => n + 1);
}

export function AutoSeeder() {
  const ensureSeeded = useMutation(api.ensureSeeded.run);
  const diagnose = useQuery(api.ensureSeeded.diagnose);
  const seededRef = useRef(false);
  const retryRef = useRef(0);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;

    ensureSeeded()
      .then((r) => setStatus(r.message))
      .catch((e) => {
        setError(String(e));
        if (retryRef.current >= MAX_RETRIES) return;
        retryRef.current++;
        setTimeout(() => {
          ensureSeeded()
            .then((r) => {
              setStatus(r.message);
              setError(null);
              forceUpdate();
            })
            .catch((e) => setError(String(e)));
        }, RETRY_DELAY_MS);
      });
  }, [ensureSeeded, forceUpdate]);

  if (!diagnose) return null;

  const missing = diagnose.courses.filter((c) => c.modules === 0);
  if (missing.length === 0 && status !== null) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-yellow-900/80 text-yellow-200 px-4 py-3 rounded-lg shadow-xl border border-yellow-700 max-w-sm text-sm space-y-1">
      <div className="font-semibold flex items-center gap-2">
        <span>⚠️</span>
        <span>Database Repair Needed</span>
      </div>
      <p className="text-yellow-300/80">
        {diagnose.courses.length} courses, {diagnose.totalModules} modules,{" "}
        {diagnose.totalLessons} lessons
      </p>
      {missing.length > 0 && (
        <p className="text-yellow-300/80">
          Missing modules for: {missing.map((c) => c.slug).join(", ")}
        </p>
      )}
      {status && <p className="text-green-300/80">{status}</p>}
      {error && <p className="text-red-300/80">Error: {error}</p>}
      <button
        onClick={() => {
          setError(null);
          setStatus(null);
          ensureSeeded()
            .then((r) => {
              setStatus(r.message);
              forceUpdate();
            })
            .catch((e) => setError(String(e)));
        }}
        className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs font-medium"
      >
        Repair Now
      </button>
    </div>
  );
}
