import { Link } from "@tanstack/react-router";
import { type LookupResult } from "../hooks/useBlueskyLookup";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { StatusIcon, Stats } from "./ui/custom";
import { AnimatedGradient } from "./ui/animated-gradient-with-svg";

interface BlueskyResultProps {
  result: LookupResult;
  handle: string;
}

export function BlueskyResult({ result, handle }: BlueskyResultProps) {
  if (result.found) {
    return <SuccessResult result={result} handle={handle} />;
  }

  return <ErrorResult result={result} handle={handle} />;
}

const BlueskyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
  >
    <path
      fill="#1185fe"
      d="M12 11.388c-.906-1.761-3.372-5.044-5.665-6.662c-2.197-1.55-3.034-1.283-3.583-1.033C2.116 3.978 2 4.955 2 5.528c0 .575.315 4.709.52 5.4c.68 2.28 3.094 3.05 5.32 2.803c-3.26.483-6.157 1.67-2.36 5.898c4.178 4.325 5.726-.927 6.52-3.59c.794 2.663 1.708 7.726 6.444 3.59c3.556-3.59.977-5.415-2.283-5.898c2.225.247 4.64-.523 5.319-2.803c.205-.69.52-4.825.52-5.399c0-.575-.116-1.55-.752-1.838c-.549-.248-1.386-.517-3.583 1.033c-2.293 1.621-4.76 4.904-5.665 6.664"
    />
  </svg>
);

function SuccessResult({ result, handle }: BlueskyResultProps) {
  const { pds } = result;

  const isMushroom = pds?.endsWith("host.bsky.network");

  return (
    <Card className="animate-in fade-in blur-in-sm duration-1000 rounded-xl overflow-clip p-0">
      <div className="relative py-8">
        {/* Content layer - stays crisp */}
        <CardContent className="p-8 text-center z-10 rounded-xl">
          <AnimatedGradient
            colors={
              isMushroom
                ? ["#0077b6", "#5e548e", "#7b2cbf"]
                : ["rgb(0, 167, 108)", "rgb(29, 119, 66)", "rgb(77, 182, 114)"]
            }
            speed={0.01}
            blur="heavy"
          />
          {/* Success header */}
          <div className="text-center">
            <StatusIcon
              type="success"
              className="mx-auto mb-4"
              icon={isMushroom ? BlueskyIcon : undefined}
            />
            <p className="text-2xl mb-4">
              <span className="font-semibold">@{handle}</span> is on{" "}
              {isMushroom ? "a first-party PDS :(" : "an independent PDS! 🎉"}
            </p>
            <p className="font-mono bg-gray-200 dark:bg-gray-700/60 rounded-md w-fit mx-auto px-2 pt-1 text-sm mb-6">
              {pds}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

function ErrorResult({ result, handle }: BlueskyResultProps) {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        {/* Error header */}
        <div className="mb-8">
          <StatusIcon type="error" className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
            Not Found 😔
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            <span className="font-semibold">@{handle}</span> couldn't be found
          </p>
          {result.error && (
            <p className="text-red-600 dark:text-red-400 mb-4">
              {result.error}
            </p>
          )}
        </div>

        {/* Help section */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-3">
            Why might this happen?
          </h3>
          <ul className="text-left text-muted-foreground space-y-2 max-w-md mx-auto">
            <li>• The handle doesn't exist on Bluesky</li>
            <li>• The handle might be misspelled</li>
            <li>• The account might be private or suspended</li>
            <li>• There might be a network issue</li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button>Try Another Handle</Button>
          </Link>
          <Button
            variant="secondary"
            onClick={() => window.open("https://bsky.app", "_blank")}
          >
            Join Bluesky
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
