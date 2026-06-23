import { useState } from "react";
import { cn } from "@/lib/utils";

interface CourseIconProps {
  icon: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function CourseIcon({ icon, className, size = "md" }: CourseIconProps) {
  const [imgError, setImgError] = useState(false);
  const iconStr = String(icon || "").trim();
  const isUrl = iconStr.toLowerCase().startsWith("http") || iconStr.startsWith("/");

  const sizeClasses = {
    sm: "w-4 h-4 text-lg",
    md: "w-8 h-8 text-2xl",
    lg: "w-12 h-12 text-4xl",
    xl: "w-16 h-16 text-5xl",
  };

  if (isUrl && !imgError) {
    return (
      <img
        src={iconStr}
        alt="Course Icon"
        className={cn("object-contain", sizeClasses[size], className)}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <span className={cn("flex items-center justify-center leading-none", sizeClasses[size], className)}>
      {icon}
    </span>
  );
}
