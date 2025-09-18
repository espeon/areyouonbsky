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

const ElephantIcon = (
  <svg
    viewBox="0 0 400 400"
    width="256"
    height="256"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      stroke="#888"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M49,211c0.363,-9.470 0.726,-18.940 4,-27c3.274,-8.060 9.458,-14.708 19,-22c9.542,-7.292 22.440,-15.226 32,-19c9.560,-3.774 15.780,-3.387 22,-3" />
      <path d="M126,140c5.671,-0.892 8.850,-1.620 17,0c8.150,1.620 21.271,5.590 31,10c9.729,4.410 16.065,9.260 21,16c4.935,6.740 8.467,15.370 12,24" />
      <path d="M207,190c2.000,4.000 1.000,2.000 0,0" />
      <path d="M221,175c-6.333,0.750 -12.667,1.500 -17,7c-4.333,5.500 -6.667,15.750 -9,26" />
      <path d="M195,208c-2.111,9.644 -2.889,20.756 -2,27c0.889,6.244 3.444,7.622 6,9" />
      <path d="M199,244c3.833,4.667 10.417,11.833 17,19" />
      <path d="M216,263c5.756,6.333 11.644,12.667 15,19c3.356,6.333 4.178,12.667 5,19" />
      <path d="M236,301c1.833,9.667 3.917,24.333 6,39" />
      <path d="M242,340c0.800,8.644 -0.200,10.756 0,12c0.200,1.244 1.600,1.622 3,2" />
      <path d="M245,354c2.867,0.533 8.533,0.867 12,0c3.467,-0.867 4.733,-2.933 6,-5" />
      <path d="M263,349c1.556,-1.889 2.444,-4.111 1,-13c-1.444,-8.889 -5.222,-24.444 -9,-40" />
      <path d="M255,296c-3.667,-9.119 -8.333,-11.917 -4,-19c4.333,-7.083 17.667,-18.452 24,-25c6.333,-6.548 5.667,-8.274 5,-10" />
      <path d="M280,242c1.992,-5.918 4.473,-15.713 3,-25c-1.473,-9.287 -6.900,-18.067 -10,-23c-3.100,-4.933 -3.873,-6.021 -8,-9c-4.127,-2.979 -11.608,-7.851 -18,-10c-6.392,-2.149 -11.696,-1.574 -17,-1" />
      <path d="M230,174c-4.667,0.667 -7.833,2.833 -11,5" />
      <path d="M196,196c0.000,0.000 -25.000,-54.000 -25,-54" />
      <path d="M171,142c-6.152,-11.372 -9.030,-12.801 -11,-14c-1.970,-1.199 -3.030,-2.169 -6,-1c-2.970,1.169 -7.848,4.477 -12,9c-4.152,4.523 -7.576,10.262 -11,16" />
      <path d="M131,152c-2.667,4.333 -3.833,7.167 -5,12c-1.167,4.833 -2.333,11.667 -1,27c1.333,15.333 5.167,39.167 9,63" />
      <path d="M134,254c3.410,14.773 7.435,20.206 12,25c4.565,4.794 9.671,8.947 14,11c4.329,2.053 7.882,2.004 11,1c3.118,-1.004 5.801,-2.963 9,-6c3.199,-3.037 6.914,-7.154 9,-11c2.086,-3.846 2.543,-7.423 3,-11" />
      <path d="M192,263c1.000,-5.667 2.000,-14.333 3,-23" />
      <path d="M258,166c1.820,-10.968 3.639,-21.937 6,-29c2.361,-7.063 5.262,-10.221 8,-13c2.738,-2.779 5.311,-5.178 10,-6c4.689,-0.822 11.493,-0.068 16,1c4.507,1.068 6.716,2.448 10,8c3.284,5.552 7.642,15.276 12,25" />
      <path d="M320,152c3.537,15.367 6.381,41.284 8,58c1.619,16.716 2.013,24.231 0,32c-2.013,7.769 -6.432,15.791 -11,21c-4.568,5.209 -9.284,7.604 -14,10" />
      <path d="M303,273c-2.133,2.800 -0.467,4.800 -5,2c-4.533,-2.800 -15.267,-10.400 -26,-18" />
      <path d="M236,300c-7.655,5.315 -15.310,10.631 -21,13c-5.690,2.369 -9.417,1.792 -25,2c-15.583,0.208 -43.024,1.202 -59,-1c-15.976,-2.202 -20.488,-7.601 -25,-13" />
      <path d="M106,301c-5.762,-3.393 -7.667,-5.375 -13,-13c-5.333,-7.625 -14.095,-20.893 -20,-36c-5.905,-15.107 -8.952,-32.054 -12,-49" />
      <path d="M61,203c-2.000,-8.500 -1.000,-5.250 0,-2" />
      <path d="M78,262c-5.600,24.511 -11.200,49.022 -20,67c-8.800,17.978 -20.800,29.422 -19,36c1.800,6.578 17.400,8.289 33,10" />
      <path d="M72,375c8.190,-0.012 12.167,-5.042 14,-17c1.833,-11.958 1.524,-30.845 4,-44c2.476,-13.155 7.738,-20.577 13,-28" />
      <path d="M100,298c-0.444,-1.600 -0.889,-3.200 -8,12c-7.111,15.200 -20.889,47.200 -20,63c0.889,15.800 16.444,15.400 32,15" />
      <path d="M104,388c6.952,0.262 8.333,-6.583 10,-11c1.667,-4.417 3.619,-6.405 7,-17c3.381,-10.595 8.190,-29.798 13,-49" />
      <path d="M171,309c2.875,9.190 5.750,18.381 4,30c-1.750,11.619 -8.125,25.667 -3,32c5.125,6.333 21.750,4.952 29,3c7.250,-1.952 5.125,-4.476 3,-7" />
      <path d="M204,367c1.220,-3.207 2.770,-7.726 2,-23c-0.770,-15.274 -3.861,-41.305 -5,-33c-1.139,8.305 -0.325,50.944 1,68c1.325,17.056 3.163,8.528 5,0" />
      <path d="M207,379c5.683,-0.443 17.389,-1.552 23,-1c5.611,0.552 5.126,2.764 6,-8c0.874,-10.764 3.107,-34.504 1,-48c-2.107,-13.496 -8.553,-16.748 -15,-20" />
      <path d="M59,180c-1.875,6.089 -3.750,12.179 -11,8c-7.250,-4.179 -19.875,-18.625 -24,-27c-4.125,-8.375 0.250,-10.679 0,-14c-0.250,-3.321 -5.125,-7.661 -10,-12" />
      <path d="M215,208c0.000,0.000 0.100,0.100 0.09999999999999432,0.09999999999999432" />
      <path d="M251,206c0.000,0.000 0.100,0.100 0.09999999999999432,0.09999999999999432" />
    </g>
  </svg>
);

function SuccessResult({ result, handle }: BlueskyResultProps) {
  const { pds } = result;

  const isMushroom = pds?.includes("host.bsky.network");
  const isBridgy = pds?.includes("brid.gy");

  return (
    <Card className="animate-in fade-in blur-in-sm duration-1000 rounded-xl overflow-clip p-0">
      <div className="relative py-8">
        {/* Content layer - stays crisp */}
        <CardContent className="p-8 text-center z-10 rounded-xl">
          <AnimatedGradient
            colors={
              isMushroom || isBridgy
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
              icon={
                isMushroom ? BlueskyIcon : isBridgy ? ElephantIcon : undefined
              }
            />
            <p className="text-2xl mb-4">
              <span className="font-semibold">@{handle}</span> is{" "}
              {isMushroom
                ? "on a first-party PDS"
                : isBridgy
                  ? "on an elephant!"
                  : "on an independent PDS! 🎉"}
              {isBridgy && "wait, huh? that doesn't make sense."}
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
