import { cn } from "@/lib/utils";

interface CourseIconProps {
  icon: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function CourseIcon({ icon, className, size = "md" }: CourseIconProps) {
  const iconStr = String(icon || "").trim();
  const isUrl = iconStr.toLowerCase().startsWith("http") || iconStr.startsWith("/");

  // Determine exact dimensions based on size prop
  const sizeClasses = {
    sm: "w-4 h-4 text-lg",
    md: "w-8 h-8 text-2xl",
    lg: "w-12 h-12 text-4xl",
    xl: "w-16 h-16 text-5xl",
  };

  if (isUrl) {
    return (
      <img
        src={iconStr}
        alt="Course Icon"
        className={cn("object-contain", sizeClasses[size], className)}
        onError={(e) => {
          // Fallback if image fails to load (though this won't fix the isUrl check issue)
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  return (
    <span className={cn("flex items-center justify-center leading-none", sizeClasses[size], className)}>
      {icon}
    </span>
  );
}
