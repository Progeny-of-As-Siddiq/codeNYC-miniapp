"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MessageInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  allowAttachments?: boolean
  files?: File[] | null
  setFiles?: React.Dispatch<React.SetStateAction<File[] | null>>
  stop?: () => void
  isGenerating?: boolean
}

export function MessageInput({
  value,
  onChange,
  allowAttachments = false,
  setFiles,
  stop,
  isGenerating,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const form = textareaRef.current?.form
      if (form) {
        form.requestSubmit()
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (allowAttachments) {
    setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (!allowAttachments || !setFiles) return

    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(droppedFiles)
    }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (!allowAttachments || !setFiles) return

    const pastedFiles = Array.from(e.clipboardData.files)
    if (pastedFiles.length > 0) {
      setFiles(pastedFiles)
    }
  }

  return (
    <div
      className={cn(
        "relative flex w-full items-end gap-2 rounded-lg border bg-background p-2",
        isDragging && "border-primary"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder="Type a message..."
        className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
        rows={1}
        disabled={isGenerating}
          />
      <div className="flex items-center gap-2">
        {isGenerating ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={stop}
            disabled={isGenerating}
          >
            <span className="sr-only">Stop generating</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
            </svg>
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            className="h-8 w-8"
            disabled={!value.trim() || isGenerating}
          >
            <span className="sr-only">Send message</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </Button>
        )}
      </div>
    </div>
  )
}
