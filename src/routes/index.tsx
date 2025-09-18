import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Layout, DarkModeToggle } from "../components/ui/custom";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [handle, setHandle] = useState("");
  const [showHoverText, setShowHoverText] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handle.trim()) {
      // Start animate-out
      setIsAnimatingOut(true);

      // Wait for animation to complete before navigating
      setTimeout(() => {
        // Remove @ if user included it
        const cleanHandle = handle.trim().replace(/^@/, "").toLowerCase();
        // add .bsky.social if no domain is provided
        if (!cleanHandle.includes(".")) {
          navigate({ to: `/${cleanHandle}.bsky.social` });
          return;
        }
        navigate({ to: `/${cleanHandle}` });
      }, 150); // Match the animation duration
    }
  };

  // Reset animation state when component mounts
  useEffect(() => {
    setIsAnimatingOut(false);
  }, []);

  return (
    <Layout>
      <div
        className={`max-w-3xl w-full text-center ${
          isAnimatingOut
            ? "animate-out fade-out blur-out-xs duration-500"
            : "animate-in fade-in blur-in-xs duration-500"
        }`}
      >
        {/* Dark mode toggle */}
        <div
          className={`absolute top-8 right-8 duration-500 ${
            isAnimatingOut
              ? "animate-out fade-out duration-500"
              : "animate-in fade-in duration-500"
          }`}
        >
          <DarkModeToggle />
        </div>

        <div className="mb-8 mt-12">
          <div className="text-5xl md:text-6xl text-foreground mb-4">
            Are you on a{" "}
            <span className="relative text-blue-400 font-bold bg-clip-text mb-6 px-2 -mx-2 rounded-xl">
              <span
                className={
                  isAnimatingOut
                    ? "animate-out blur-out-sm duration-500"
                    : "animate-in blur-in-sm duration-500"
                }
              >
                Bluesky PDS?
              </span>
              <div className="absolute inset-0 bg-accent/20 -rotate-1 hover:rotate-2 overflow-clip rounded-xl border">
                <AnimatedGradient
                  colors={["#0077b6", "#5e548e", "#7b2cbf"]}
                  speed={0.05}
                  blur="medium"
                />
              </div>
            </span>
          </div>
          <p className="md:text-lg text-muted-foreground mb-8">
            Enter a handle to check if someone is on Bluesky's Personal Data
            Server
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`mb-8 duration-750 ${
            isAnimatingOut
              ? "animate-out fade-out duration-750"
              : "animate-in fade-in duration-750"
          }`}
        >
          <div className="flex flex-row max-w-lg mx-auto shadow-md rounded-lg">
            <Input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="username.bsky.social"
              autoFocus
              className="text-lg py-3 rounded-r-none h-10 focus-visible:ring-ring/0 focus-visible:ring-[0px]"
            />
            <Button type="submit" size="lg" className="rounded-l-none">
              Check
            </Button>
          </div>
        </form>
      </div>
      <div
        className={`absolute bottom-8 duration-500 ${
          isAnimatingOut
            ? "animate-out fade-out blur-out-xs duration-500"
            : "animate-in fade-in blur-in-xs duration-500"
        }`}
        onMouseLeave={() => setShowHoverText(false)}
      >
        <div className="relative">
          made by{" "}
          <a
            href="https://bsky.app/profile/natalie.sh"
            className="hover:text-blue-400"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setShowHoverText(true)}
          >
            natalie.sh
          </a>
          . uses{" "}
          <a
            href="https://bsky.app/profile/microcosm.blue"
            className="hover:text-blue-400"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setShowHoverText(false)}
          >
            microcosm.blue
          </a>
          {showHoverText && (
            <div
              onMouseEnter={() => setShowHoverText(true)}
              onMouseLeave={() => setShowHoverText(false)}
              className="absolute top-6 left-0 right-0 w-full text-center text-sm text-muted-foreground animate-in fade-in duration-200"
            >
              on{" "}
              <a
                href="https://selfhosted.social"
                className="hover:text-blue-400"
                target="_blank"
                rel="noreferrer"
              >
                selfhosted.social
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
