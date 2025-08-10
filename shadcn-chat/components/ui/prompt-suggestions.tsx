interface PromptSuggestionsProps {
  label: string
  append: (message: { role: "user"; content: string }) => void
  suggestions: string[]
}

export function PromptSuggestions({
  label,
  append,
  suggestions,
}: PromptSuggestionsProps) {
  return (
    <div className="space-y-2 md:space-y-4">
      <h2 className="text-center text-sm md:text-lg font-bold">{label}</h2>
      <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4 text-xs md:text-sm">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => append({ role: "user", content: suggestion })}
            className="w-full max-w-xs md:max-w-none md:flex-1 rounded-md md:rounded-xl border bg-background p-1 md:p-3 hover:bg-muted text-xs md:text-sm"
          >
            <p className="truncate md:whitespace-normal">{suggestion}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
