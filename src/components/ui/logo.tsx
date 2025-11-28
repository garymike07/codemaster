import { Terminal, Code2, Cpu } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-primary-foreground overflow-hidden transition-transform group-hover:scale-105 shadow-lg shadow-primary/25">
        <Terminal className="absolute h-5 w-5 transition-all duration-500 group-hover:opacity-0 group-hover:rotate-90" />
        <Code2 className="absolute h-5 w-5 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-0 -rotate-90" />
        
        {/* Glitch effect overlay */}
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-shimmer" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-none tracking-tight">
          Code<span className="text-primary">Master</span>
        </span>
        <span className="text-[0.65rem] text-muted-foreground leading-none font-mono tracking-wider">
          LEARN. BUILD. MASTER.
        </span>
      </div>
    </div>
  );
}
