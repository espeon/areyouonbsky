import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useBlueskyLookup } from "../hooks/useBlueskyLookup";
import { Layout, DarkModeToggle } from "../components/ui/custom";
import { BlueskyResult } from "../components/BlueskyResult";
import { LoadingState } from "../components/LoadingState";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/$handle")({
  component: HandleLookup,
});

function HandleLookup() {
  const { handle } = Route.useParams();
  const { result, loading, lookup } = useBlueskyLookup();

  useEffect(() => {
    lookup(handle);
  }, [handle, lookup]);

  if (loading) {
    return <LoadingState handle={handle} />;
  }

  return (
    <Layout>
      <div className="w-full max-w-2xl animate-in fade-in duration-300">
        {/* Header with back button and dark mode toggle */}
        <div className="flex justify-between items-center mb-4 animate-in fade-in blur-in-xs duration-250">
          <Link
            to="/"
            className="inline-flex items-center text-primary/80 hover:text-primary transition-colors gap-2"
          >
            <Button variant="ghost" size="default">
              <ArrowLeft size={18} /> Back to search{" "}
            </Button>
          </Link>
          <DarkModeToggle className="text-primary/80 hover:text-primary transition-colors " />
        </div>

        {/* Main content */}
        {result && <BlueskyResult result={result} handle={handle} />}
      </div>
    </Layout>
  );
}
