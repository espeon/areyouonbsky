import { Moon, Sun, Loader2, Check, X, type LucideProps } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DarkModeToggleProps {
  className?: string;
}

export function DarkModeToggle({ className }: DarkModeToggleProps) {
  const { darkMode, toggle } = useDarkMode();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className={cn(className)}
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

interface StatusIconProps {
  type: "success" | "error" | "loading";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  className?: string;
}

export function StatusIcon({
  type,
  size = "md",
  className,
  icon,
}: StatusIconProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-20 w-20",
    lg: "h-32 w-32",
  };

  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  if (type === "loading") {
    return (
      <div
        className={cn(
          "flex items-center justify-center",
          sizeClasses[size],
          className,
        )}
      >
        <Loader2
          className={cn("animate-spin text-primary", iconSizeClasses[size])}
        />
      </div>
    );
  }

  const AsIcon = icon;

  const bgColor =
    type === "success"
      ? "bg-green-100 dark:bg-green-900/30"
      : "bg-red-100 dark:bg-red-900/30";

  const iconColor =
    type === "success"
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";

  if (AsIcon) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          bgColor,
          sizeClasses[size],
          className,
        )}
      >
        {icon}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full",
        bgColor,
        sizeClasses[size],
        className,
      )}
    >
      {type === "success" ? (
        <Check className={cn(iconSizeClasses[size], iconColor)} />
      ) : (
        <X className={cn(iconSizeClasses[size], iconColor)} />
      )}
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen gradient-bg flex items-center justify-center p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface StatsProps {
  stats: Array<{
    label: string;
    value: number;
  }>;
  className?: string;
}

export function Stats({ stats, className }: StatsProps) {
  return (
    <div
      className={cn(
        "flex justify-center gap-6 text-sm text-muted-foreground",
        className,
      )}
    >
      {stats.map(({ label, value }) => (
        <span key={label}>
          <strong className="text-foreground">{value.toLocaleString()}</strong>{" "}
          {label}
        </span>
      ))}
    </div>
  );
}
