import { getConvexAuthHeader, getConvexSiteUrl, type AuthTokenGetter } from "@/lib/convexHttp";

export interface RemoteExecutionResult {
  output: string;
  error: string;
  status: string;
  time?: number;
  memory?: number;
}

export async function executeRemoteCode({
  code,
  language,
  stdin,
  getToken,
}: {
  code: string;
  language: string;
  stdin?: string;
  getToken: AuthTokenGetter;
}): Promise<RemoteExecutionResult> {
  const response = await fetch(`${getConvexSiteUrl()}/api/code/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await getConvexAuthHeader(getToken)),
    },
    body: JSON.stringify({ code, language, stdin }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Code execution failed with HTTP ${response.status}`);
  }

  return {
    output: data.output || "",
    error: data.error || "",
    status: data.status || "Unknown",
    time: data.time,
    memory: data.memory,
  };
}
