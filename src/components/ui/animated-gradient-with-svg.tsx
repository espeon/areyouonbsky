import React, { useMemo, useRef } from "react";
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

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef as any);

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height],
  );

  const circleConfigs = useMemo(
    () =>
      colors.map((color, index) => ({
        color,
        top: 0.12 * 50 * index,
        left: 0.5 * 50 * index,
        width: circleSize * 0.8,
        height: circleSize * 1.4812,
        tx1: 0.345 - 0.5 + index,
        ty1: 0.122 - 0.5 - index,
        tx2: 0.5835 - 0.5 - index,
        ty2: 0.9484 - 0.5 + index,
        tx3: 0.4353 - 0.5 - index,
        ty3: 0.3458 - 0.5 + index,
        tx4: 0.9372 - 0.5 - index,
        ty4: 0.8743 - 0.5 + index,
      })),
    [colors, circleSize],
  );

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
};

export { AnimatedGradient };
