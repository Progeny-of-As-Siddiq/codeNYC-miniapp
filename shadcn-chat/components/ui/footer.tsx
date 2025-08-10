import { cn } from "@/lib/utils";
import React from "react";

export function Footer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <footer className={cn("w-full", className)}>
      {children}
    </footer>
  );
}

export function FooterContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-8 py-8 md:grid-cols-4", className)}>
      {children}
    </div>
  );
}

export function FooterColumn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col space-y-3", className)}>
      {children}
    </div>
  );
}

export function FooterBottom({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border-t py-6 text-center text-sm text-muted-foreground", className)}>
      {children}
    </div>
  );
} 