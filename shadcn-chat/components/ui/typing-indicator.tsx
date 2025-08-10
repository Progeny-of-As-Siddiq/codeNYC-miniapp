"use client"

import { cn } from "@/lib/utils"

export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="h-2 w-2 animate-bounce rounded-full border border-muted-foreground bg-background [animation-delay:-0.3s]" />
      <div className="h-2 w-2 animate-bounce rounded-full border border-muted-foreground bg-background [animation-delay:-0.15s]" />
      <div className="h-2 w-2 animate-bounce rounded-full border border-muted-foreground bg-background" />
    </div>
  )
}
