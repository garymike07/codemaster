# Debug Session: dashboard-convex-sync
- **Status**: [OPEN]
- **Issue**: Dashboard stays in loading state after login while Convex sync WebSocket repeatedly fails.
- **Debug Server**: http://127.0.0.1:7777/event
- **Log File**: `.dbg/trae-debug-log-dashboard-convex-sync.ndjson`

## Reproduction Steps
1. Start the local app and log in.
2. Navigate to `/dashboard`.
3. Observe the dashboard remaining on loading placeholders.
4. Check the browser console for Convex WebSocket failures to `ws://127.0.0.1:3212/api/1.41.0/sync`.

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | `VITE_CONVEX_URL` resolves to a backend that is not accepting the sync WebSocket connection. | High | Low | Confirmed |
| B | A stale or unhealthy local Convex process is holding port `3212` but not serving a healthy sync endpoint. | High | Medium | Confirmed |
| C | Clerk auth is fine, but Convex auth/session bridging never becomes ready because the backend connection never stabilizes. | Medium | Medium | Rejected |
| D | The dashboard page has no proper error state and keeps rendering skeletons while Convex queries never resolve. | Medium | Medium | Confirmed |
| E | Clerk itself is not finishing client-side bootstrap, so Convex auth never gets a stable token/session to validate. | High | Medium | Confirmed |

## Log Evidence
- `.env.local` points `VITE_CONVEX_URL` to `http://127.0.0.1:3212`.
- Before starting a persistent Convex process, direct requests to `http://127.0.0.1:3212/version` and `http://127.0.0.1:3212/health` failed with "Unable to connect to the remote server".
- `Get-NetTCPConnection -LocalPort 3212` returned no active listener during the failing state.
- Starting `bunx convex dev --once` successfully prepared the local Convex deployment, confirming the project itself is valid.
- Starting persistent `bunx convex dev` made `http://127.0.0.1:3212/` respond with HTTP `200` and `http://127.0.0.1:3212/version` return `unknown`, confirming backend health can be checked over HTTP.
- `Dashboard.tsx` previously rendered `DashboardSkeleton` indefinitely whenever any Convex query stayed `undefined`, so backend failure surfaced only as permanent loading UI.
- Debug server logs from `src/App.tsx` show `useConvexAuth().isLoading` staying `true` on `/dashboard` even after timeout.
- Debug server logs from `src/components/layout/DashboardLayout.tsx` previously showed Clerk user data was available, so the original stall was not just missing page data.
- After the latest reload, debug server logs from `src/main.tsx` show Clerk repeatedly stuck at `isLoaded: false`, with no successful `convex` token fetch event following it.

## Verification Conclusion
- Root cause is the local app depending on a Convex backend URL that is sometimes not backed by a healthy long-running `convex dev` process.
- Secondary UX bugs are that the route gate and dashboard both hid backend/auth failures behind indefinite loading states.
- Current active blocker is Clerk client bootstrap not completing in the browser, which prevents Convex auth from ever settling.
- Fixes in progress:
  - `start-local.ps1` now validates backend health over HTTP before deciding whether to reuse or start Convex.
  - `Dashboard.tsx` now times out unresolved query loading and shows a clear error with recovery guidance instead of infinite skeletons.
  - `App.tsx` now times out route auth loading and distinguishes between a stuck Clerk bootstrap and a stuck Convex session.
