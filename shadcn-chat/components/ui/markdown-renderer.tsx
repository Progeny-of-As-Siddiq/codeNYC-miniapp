import React, { Suspense, type ElementType } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import type { Components } from "react-markdown"
import Image from "next/image"
import { useMiniKit, useOpenUrl } from "@coinbase/onchainkit/minikit"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/ui/copy-button"

interface MarkdownRendererProps {
  children: string
}

export function MarkdownRenderer({ children }: MarkdownRendererProps) {
  const { context } = useMiniKit();
  const openUrl = useOpenUrl();
  const inMiniApp = Boolean(context?.location || context?.user?.fid);

  const components = getComponents({ inMiniApp, openUrl });

  return (
    <div className="space-y-3">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {children}
      </Markdown>
    </div>
  )
}

interface HighlightedPre extends React.HTMLAttributes<HTMLPreElement> {
  children: string
  language: string
}

const HighlightedPre = React.memo(
  async ({ children, language, ...props }: HighlightedPre) => {
    const { codeToTokens, bundledLanguages } = await import("shiki")

    if (!(language in bundledLanguages)) {
      return <pre {...props}>{children}</pre>
    }

    const { tokens } = await codeToTokens(children, {
      lang: language as keyof typeof bundledLanguages,
      defaultColor: false,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    })

    return (
      <pre {...props}>
        <code>
          {tokens.map((line, lineIndex) => (
            <>
              <span key={lineIndex}>
                {line.map((token, tokenIndex) => {
                  const style =
                    typeof token.htmlStyle === "string"
                      ? undefined
                      : token.htmlStyle

                  return (
                    <span
                      key={tokenIndex}
                      className="text-shiki-light bg-shiki-light-bg dark:text-shiki-dark dark:bg-shiki-dark-bg"
                      style={style}
                    >
                      {token.content}
                    </span>
                  )
                })}
              </span>
              {lineIndex !== tokens.length - 1 && "\n"}
            </>
          ))}
        </code>
      </pre>
    )
  }
)
HighlightedPre.displayName = "HighlightedCode"

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode
  className?: string
  language: string
}

const CodeBlock = ({
  children,
  className,
  language,
  ...restProps
}: CodeBlockProps) => {
  const code =
    typeof children === "string"
      ? children
      : childrenTakeAllStringContents(children)

  const preClass = cn(
    "overflow-x-scroll rounded-md border bg-background/50 p-4 font-mono text-sm [scrollbar-width:none]",
    className
  )

  return (
    <div className="group/code relative mb-4">
      <Suspense
        fallback={
          <pre className={preClass} {...restProps}>
            {children}
          </pre>
        }
      >
        <HighlightedPre language={language} className={preClass}>
          {code}
        </HighlightedPre>
      </Suspense>

      <div className="invisible absolute right-2 top-2 flex space-x-1 rounded-lg p-1 opacity-0 transition-all duration-200 group-hover/code:visible group-hover/code:opacity-100">
        <CopyButton content={code} copyMessage="Copied code to clipboard" />
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function childrenTakeAllStringContents(element: any): string {
  if (typeof element === "string") {
    return element
  }

  if (element?.props?.children) {
    const children = element.props.children

    if (Array.isArray(children)) {
      return children
        .map((child) => childrenTakeAllStringContents(child))
        .join("")
    } else {
      return childrenTakeAllStringContents(children)
    }
  }

  return ""
}

function withClass(Tag: ElementType, classes: string) {
  const Component = ({ 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    node, 
    ...props 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any) => (
    <Tag className={classes} {...props} />
  )
  Component.displayName = String(Tag)
  return Component
}

function getComponents({ inMiniApp, openUrl }: { inMiniApp: boolean; openUrl: (url: string) => void }): Components {
  return {
  h1: withClass("h1", "text-2xl font-semibold"),
  h2: withClass("h2", "font-semibold text-xl"),
  h3: withClass("h3", "font-semibold text-lg"),
  h4: withClass("h4", "font-semibold text-base"),
  h5: withClass("h5", "font-medium"),
  strong: withClass("strong", "font-semibold"),
  a: ({ 
    children, 
    href,
    ...props 
  }) => {
    // Check if this is a payment link
    if (href && href.includes('commerce.coinbase.com')) {
      return (
        <span className="block my-4">
          <span className="block flex justify-center mt-2">
            {inMiniApp ? (
              <button
                onClick={() => openUrl(href)}
                className="rounded-full border border-border shadow-md"
                aria-label="Pay with Flyte AI"
              >
                <Image src="/flyte_coin.png" alt="Pay with Flyte AI" width={64} height={64} className="hover:scale-110 transition-transform duration-200 cursor-pointer rounded-full" />
              </button>
            ) : (
              <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                <Image src="/flyte_coin.png" alt="Pay with Flyte AI" width={64} height={64} className="hover:scale-110 transition-transform duration-200 cursor-pointer rounded-full border border-border shadow-md" />
              </a>
            )}
          </span>
        </span>
      );
    }
    // Default link styling
    return <a href={href} className="text-primary underline underline-offset-2" {...props}>{children}</a>;
  },
  blockquote: withClass("blockquote", "border-l-2 border-primary pl-4"),
  code: ({ 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    node, 
    children, 
    className, 
    ...rest 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any) => {
    const match = /language-(\w+)/.exec(className || "")
    return match ? (
      <CodeBlock className={className} language={match[1]} {...rest}>
        {children}
      </CodeBlock>
    ) : (
      <code
        className={cn(
          "font-mono [:not(pre)>&]:rounded-md [:not(pre)>&]:bg-background/50 [:not(pre)>&]:px-1 [:not(pre)>&]:py-0.5"
        )}
        {...rest}
      >
        {children}
      </code>
    )
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre: ({ children }: any) => children,
  ol: withClass("ol", "list-decimal space-y-2 pl-6"),
  ul: withClass("ul", "list-disc space-y-2 pl-6"),
  li: withClass("li", "my-1.5"),
  table: withClass(
    "table",
    "w-full border-collapse overflow-y-auto rounded-md border border-foreground/20"
  ),
  th: withClass(
    "th",
    "border border-foreground/20 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
  ),
  td: withClass(
    "td",
    "border border-foreground/20 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
  ),
  tr: withClass("tr", "m-0 border-t p-0 even:bg-muted"),
  p: ({ children, ...props }: { children?: React.ReactNode }) => {
    if (
      Array.isArray(children) &&
      children.length === 1 &&
      React.isValidElement(children[0]) &&
      typeof children[0].props === 'object' &&
      children[0].props !== null &&
      'children' in children[0].props &&
      React.Children.toArray((children[0].props as { children?: React.ReactNode }).children).some(
        (el) =>
          React.isValidElement(el) &&
          el.type === 'a' &&
          typeof el.props === 'object' &&
          el.props !== null &&
          'href' in el.props &&
          typeof el.props.href === 'string' &&
          el.props.href.includes('commerce.coinbase.com')
      )
    ) {
      return <div {...props}>{children}</div>;
    }
    return <p className="whitespace-pre-wrap" {...props}>{children}</p>;
  },
  hr: withClass("hr", "border-foreground/20"),
  } as const
}

export default MarkdownRenderer
