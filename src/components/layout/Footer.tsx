import { LinkBridgeLogo } from "@/components/ui/linkbridge-logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 mt-auto">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CodeMaster. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Powered by</span>
          <LinkBridgeLogo size="md" />
        </div>
      </div>
    </footer>
  );
}
