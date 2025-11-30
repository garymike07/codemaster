export function LinkBridgeLogo({ className = "", size = "sm" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { height: "h-16" },
    md: { height: "h-24" },
    lg: { height: "h-32" },
  };

  const s = sizes[size];

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img 
        src="/linkbridge-logo.png" 
        alt="LinkBridge" 
        className={`${s.height} w-auto object-contain`}
      />
    </div>
  );
}
