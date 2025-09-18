import React, { useMemo, useRef, memo } from "react";
import { cn } from "@/lib/utils";
import { useState, useEffect, type RefObject } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export function useDimensions(
  ref: RefObject<HTMLElement | SVGElement>,
): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    const debouncedUpdateDimensions = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 250); // Wait 250ms after resize ends
    };

    // Initial measurement
    updateDimensions();

    window.addEventListener("resize", debouncedUpdateDimensions);

    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions);
      clearTimeout(timeoutId);
    };
  }, [ref]);

  return dimensions;
}

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = memo(
  ({ colors, speed = 5, blur = "light" }) => {
    console.log("AnimatedGradient render", { colors, speed, blur });
    console.log("Colors array reference:", colors);
    console.log("Colors stringified:", JSON.stringify(colors));
    const containerRef = useRef<HTMLDivElement>(null);
    const dimensions = useDimensions(containerRef as any);

    const circleSize = useMemo(
      () => Math.max(dimensions.width, dimensions.height),
      [dimensions.width, dimensions.height],
    );

    const circleConfigs = useMemo(() => {
      console.log("circleConfigs useMemo recalculating");
      // Simple seeded random number generator for consistent pseudo-randomness
      const seededRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };

      // Hash a string to get a number (for color-based seeding)
      const hashString = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
      };

      // Pseudo-random integer between min and max
      const randomInt = (min: number, max: number, seed: number) => {
        return min + seededRandom(seed) * (max - min);
      };

      return colors.map((color, index) => {
        const baseSeed = Math.random() * 1000;

        return {
          color,
          top: seededRandom(baseSeed + 1 + index) * 50,
          left: seededRandom(baseSeed + 2 + index) * 50,
          width: circleSize * randomInt(0.5, 1.5, baseSeed + 3),
          height: circleSize * randomInt(0.5, 1.5, baseSeed + 4),
          tx1: seededRandom(baseSeed + 5) - 0.5,
          ty1: seededRandom(baseSeed + 6) - 0.5,
          tx2: seededRandom(baseSeed + 7) - 0.5,
          ty2: seededRandom(baseSeed + 8) - 0.5,
          tx3: seededRandom(baseSeed + 9) - 0.5,
          ty3: seededRandom(baseSeed + 10) - 0.5,
          tx4: seededRandom(baseSeed + 11) - 0.5,
          ty4: seededRandom(baseSeed + 12) - 0.5,
        };
      });
    }, [colors, circleSize]);

    const blurClass =
      blur === "light"
        ? "blur-2xl"
        : blur === "medium"
          ? "blur-3xl"
          : "blur-[100px]";

    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <div className={cn(`absolute inset-0`, blurClass)}>
          {circleConfigs.map((config, index) => (
            <svg
              key={index}
              className="absolute animate-background-gradient"
              style={
                {
                  top: `${config.top}%`,
                  left: `${config.left}%`,
                  "--background-gradient-speed": `${1 / speed}s`,
                  "--tx-1": config.tx1 + index * 0.1,
                  "--ty-1": config.ty1,
                  "--tx-2": config.tx2,
                  "--ty-2": config.ty2 + index * 0.1,
                  "--tx-3": config.tx3 + index * 0.1,
                  "--ty-3": config.ty3,
                  "--tx-4": config.tx4 + index * 0.1,
                  "--ty-4": config.ty4 + index * 0.1,
                } as React.CSSProperties
              }
              width={config.width}
              height={config.height}
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="50"
                fill={config.color}
                className="opacity-30 dark:opacity-[0.15]"
              />
            </svg>
          ))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    console.log("memo comparison:", {
      colorsEqual: prevProps.colors === nextProps.colors,
      speedEqual: prevProps.speed === nextProps.speed,
      blurEqual: prevProps.blur === nextProps.blur,
      prevColors: prevProps.colors,
      nextColors: nextProps.colors,
    });
    return (
      prevProps.colors === nextProps.colors &&
      prevProps.speed === nextProps.speed &&
      prevProps.blur === nextProps.blur
    );
  },
);

AnimatedGradient.displayName = "AnimatedGradient";

export { AnimatedGradient };
