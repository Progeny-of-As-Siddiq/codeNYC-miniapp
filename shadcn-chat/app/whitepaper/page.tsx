"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function Whitepaper() {
  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-8 md:px-16 lg:px-48">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Title & Subtitle */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Flyte AI</h1>
            <p className="text-xl text-muted-foreground mb-6">The Future of AI-Powered, Crypto-Native Travel</p>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline">AI-Powered</Badge>
              <Badge variant="outline">Crypto-Native</Badge>
              <Badge variant="outline">Web3</Badge>
            </div>
          </div>

          {/* Vision Statement */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Vision</h2>
            <p className="mb-4 text-muted-foreground">Flyte AI is building the world&apos;s first truly intelligent travel assistant that combines the power of large language models with secure, on-chain payments. We&apos;re not just another OTA—we&apos;re reimagining the entire travel booking experience for the AI and crypto era.</p>
            <p className="mb-2 text-muted-foreground">Our platform leverages advanced natural language processing to understand complex travel requests, while our proprietary AI models optimize for user preferences, pricing, and availability across 300+ airlines. All of this is powered by a secure, scalable infrastructure that puts users in control of their data and payments.</p>
          </div>

          <hr className="border-muted-foreground/20" />

          {/* Market Opportunity */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Market Opportunity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Global Air Travel</h3>
                <p className="text-muted-foreground">$800B+ annual market</p>
                <p className="text-muted-foreground">2.5B+ passengers annually</p>
                <p className="text-muted-foreground">5% YoY growth rate</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Crypto Market</h3>
                <p className="text-muted-foreground">400M+ crypto holders</p>
                <p className="text-muted-foreground">$2T+ market cap</p>
                <p className="text-muted-foreground">Growing institutional adoption</p>
              </div>
            </div>
            <p className="mb-2 text-muted-foreground">The convergence of AI and crypto creates a unique opportunity to capture a significant share of the $800B+ global air travel market while serving the rapidly growing crypto-native user base.</p>
          </div>

          <hr className="border-muted-foreground/20" />

          {/* Technical Architecture */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Technical Architecture</h2>
            <p className="mb-4 text-muted-foreground">Our platform is built on a modern, scalable stack that combines the best of AI, blockchain, and traditional travel technology:</p>
            <ul className="list-disc pl-6 mb-2 text-muted-foreground space-y-1">
              <li><span className="font-semibold">AI Engine</span> — Custom fine-tuned LLM for travel-specific queries, with proprietary prompt engineering for optimal flight matching</li>
              <li><span className="font-semibold">Smart Contract Layer</span> — Secure, audited contracts for payment processing and loyalty management</li>
              <li><span className="font-semibold">Real-time Integration</span> — Direct API connections to major airlines and GDS systems</li>
              <li><span className="font-semibold">Security Infrastructure</span> — Multi-sig wallets, encrypted data storage, and zero-knowledge proofs for privacy</li>
            </ul>
          </div>

          <hr className="border-muted-foreground/20" />

          {/* Airline Partnerships */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Airline Partnerships</h2>
            <p className="mb-2 text-muted-foreground">Flyte AI has established direct integration partnerships with over 300+ global airlines, enabling real-time booking, inventory visibility, and seamless confirmations. Our partnerships include major carriers such as:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 border rounded-lg text-center">
                <p className="font-semibold">United Airlines</p>
                <p className="text-sm text-muted-foreground">Global Network</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="font-semibold">Air Canada</p>
                <p className="text-sm text-muted-foreground">Star Alliance</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="font-semibold">British Airways</p>
                <p className="text-sm text-muted-foreground">OneWorld</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="font-semibold">Lufthansa</p>
                <p className="text-sm text-muted-foreground">Star Alliance</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="font-semibold">American Airlines</p>
                <p className="text-sm text-muted-foreground">OneWorld</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="font-semibold">JetBlue</p>
                <p className="text-sm text-muted-foreground">Domestic Focus</p>
              </div>
            </div>
          </div>

          <hr className="border-muted-foreground/20" />

          {/* Product Differentiators */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Product Differentiators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">AI & User Experience</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Natural language processing for complex queries</li>
                  <li>Context-aware conversation memory</li>
                  <li>Personalized recommendations</li>
                  <li>Voice interface support</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Crypto & Security</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Multi-chain wallet integration</li>
                  <li>Secure payment processing</li>
                  <li>User-controlled data</li>
                  <li>Transparent pricing</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-muted-foreground/20" />

          {/* Roadmap Highlights */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Strategic Roadmap</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Q3 2025</span>
                  <span className="text-sm text-muted-foreground">Phase 1</span>
                </div>
                <p className="text-muted-foreground">Launch fully agentic checkout system with advanced AI decision-making capabilities</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Q1 2026</span>
                  <span className="text-sm text-muted-foreground">Phase 2</span>
                </div>
                <p className="text-muted-foreground">Deploy voice-based assistant with natural language understanding and real-time processing</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Q2 2026</span>
                  <span className="text-sm text-muted-foreground">Phase 3</span>
                </div>
                <p className="text-muted-foreground">Introduce $FLYTE token ecosystem for governance, loyalty, and utility</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Q4 2026</span>
                  <span className="text-sm text-muted-foreground">Phase 4</span>
                </div>
                <p className="text-muted-foreground">Launch native mobile applications with offline capabilities and push notifications</p>
              </div>
            </div>
          </div>

          <hr className="border-muted-foreground/20" />

          {/* The Ask */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Investment Opportunity</h2>
            <p className="mb-4 text-muted-foreground">We&apos;re seeking strategic investors to join us in revolutionizing the travel industry. Our current round will fuel:</p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-1">
              <li>Expansion of our AI engineering team</li>
              <li>Development of proprietary travel-specific language models</li>
              <li>Integration with additional airlines and payment networks</li>
              <li>Launch of the $FLYTE token ecosystem</li>
            </ul>
            <p className="mb-2 text-muted-foreground">We&apos;ve already validated our technology with real users and transactions. Our MVP demonstrates the viability of AI-powered, crypto-native travel booking, and we&apos;re ready to scale.</p>
          </div>

          <hr className="border-muted-foreground/20" />

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Contact</h2>
            <div className="space-y-2">
              <p className="text-muted-foreground">Ebrahim Zulqarni, CEO – <a href="mailto:ezulqarni2@gmail.com" className="underline hover:text-foreground">ezulqarni2@gmail.com</a></p>
              <p className="text-muted-foreground">Umar Siddiqui, CTO – <a href="mailto:umar1124@gmail.com" className="underline hover:text-foreground">umar1124@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
} 