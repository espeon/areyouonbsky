import { useState, useCallback } from "react";

export interface LookupResult {
  found: boolean;
  error?: string;
  pds?: string;
}

export function useBlueskyLookup() {
  const [result, setResult] = useState<LookupResult | null>(null);
  const [loading, setLoading] = useState(false);

  const lookup = useCallback(async (handle: string) => {
    setLoading(true);
    setResult(null);

    try {
      // Use the slingshot API to resolve handle and get basic info
      const resolveResponse = await fetch(
        `https://slingshot.microcosm.blue/xrpc/com.bad-example.identity.resolveMiniDoc?identifier=${handle}`,
      );

      if (!resolveResponse.ok) {
        setResult({ found: false, error: "Handle not found" });
        return;
      }

      const resolveData = await resolveResponse.json();

      setResult({
        found: true,
        pds: resolveData.pds,
      });
    } catch (error) {
      setResult({
        found: false,
        error: "Network error or invalid response",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setLoading(false);
  }, []);

  return {
    result,
    loading,
    lookup,
    reset,
  };
}
