export type AuthTokenGetter = (options?: { template?: string }) => Promise<string | null>;

export function getConvexSiteUrl(): string {
  const convexUrl = import.meta.env.VITE_CONVEX_URL;
  if (!convexUrl) {
    throw new Error("VITE_CONVEX_URL is not configured");
  }

  return convexUrl.replace(".cloud", ".site");
}

export async function getConvexAuthHeader(getToken: AuthTokenGetter): Promise<HeadersInit> {
  const token = await getToken({ template: "convex" });
  if (!token) {
    throw new Error("You must be signed in to use this feature.");
  }

  return { Authorization: `Bearer ${token}` };
}
