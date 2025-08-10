import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AIForGoodPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9089fc]/10 via-transparent to-indigo-500/10" />
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#9089fc] to-indigo-600 bg-clip-text text-transparent">
              The Truth About AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Power, Potential & Responsibility
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-lg leading-relaxed mb-6">
            AI is one of the most powerful tools humanity has ever built — and like all powerful tools, 
            it can be used to uplift or to control.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            It&apos;s no secret that the upper echelons of society are racing to dominate AI. From corporate 
            monopolies to government surveillance, the risks are real: bias, privacy erosion, unchecked 
            automation. But the solution isn&apos;t fear — it&apos;s awareness, action, and access.
          </p>

          <div className="bg-gradient-to-r from-[#9089fc]/10 to-indigo-500/10 border border-[#9089fc]/20 rounded-lg p-8 my-8">
            <p className="text-lg leading-relaxed mb-0 font-medium">
              At Flyte AI, we believe AI should serve people — not the other way around. We use AI to 
              simplify, empower, and create more freedom. And we support an open future where AI is 
              transparent, ethical, and shared.
            </p>
          </div>

          <p className="text-lg leading-relaxed mb-6">
            This isn&apos;t just about tech. It&apos;s about who gets to shape the future. And together, we can 
            make sure it&apos;s not just a future for the few — but for all.
          </p>

          <div className="text-center border-t pt-8 mt-12">
            <div className="text-2xl font-light text-muted-foreground mb-8">⸻</div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-4">Ready to Experience AI That Serves You?</h3>
              <p className="text-muted-foreground mb-6">
                Start with something simple: finding the perfect flight, powered by AI that puts you first.
              </p>
              
              <Button asChild size="lg" className="bg-[#9089fc] hover:bg-[#7c6df7]">
                <Link href="/chat">Try Flyte AI</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Flyte AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 