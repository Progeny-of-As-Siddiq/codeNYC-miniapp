import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#9089fc] to-indigo-600 bg-clip-text text-transparent">
            Flying Forward: Smarter Travel, Sustainable Future
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Air travel has a significant environmental impact — there&apos;s no denying that. Planes burn fuel, and that means CO₂ emissions. But the answer isn&apos;t to stop flying altogether — it&apos;s to <strong>fly smarter</strong>.
            </p>

            <p>
              At Flyte AI, we&apos;re building a better way to travel. Our AI-powered booking system doesn&apos;t just save you time and money — it helps you make more conscious choices. We surface more efficient routes, optimize for newer aircraft with better fuel efficiency, and support carriers investing in sustainable aviation fuels (SAF) and net-zero goals.
            </p>

            <p>
              Every flight leaves a footprint. But with better tools and better data, society can reduce unnecessary emissions, support greener innovation in aviation, and shift toward a future where exploration and sustainability go hand in hand.
            </p>

            <p className="text-[#9089fc] font-semibold text-xl">
              Flyte AI is just one step — but it&apos;s in the right direction.
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#9089fc]/10 to-indigo-100/50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to fly smarter?</h2>
              <p className="text-muted-foreground mb-6">
                Start making more conscious travel choices with Flyte AI&apos;s intelligent booking system.
              </p>
              <Button asChild size="lg" className="bg-[#9089fc] hover:bg-[#7c6df7]">
                <Link href="/chat">Book Your Next Flight</Link>
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#9089fc]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-semibold mb-2">Efficient Routes</h3>
              <p className="text-sm text-muted-foreground">
                AI-optimized flight paths that reduce fuel consumption and emissions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#9089fc]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✈️</span>
              </div>
              <h3 className="font-semibold mb-2">Modern Aircraft</h3>
              <p className="text-sm text-muted-foreground">
                Prioritizing newer, more fuel-efficient aircraft in our recommendations
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#9089fc]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔋</span>
              </div>
              <h3 className="font-semibold mb-2">Sustainable Fuels</h3>
              <p className="text-sm text-muted-foreground">
                Supporting airlines investing in SAF and net-zero initiatives
              </p>
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