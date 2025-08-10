import { HeroContent } from "@/components/HeroContent"
import FooterSection from "@/components/sections/FooterSection"
import { MarqueeDemo } from "@/components/sections/MarqueeDemo"
import { DemoVideoSection } from "@/components/sections/DemoVideoSection"
import AnimatedTestimonialsDemo from "@/components/animated-testimonials-demo"
import Starfield from "@/components/Starfield"
import { Partners3DCard } from "@/components/partners-3d-card"
import { WaitlistSection } from "@/components/ui/waitlist-section"

// TEMPORARY MAINTENANCE MODE - Set to false to restore homepage
const MAINTENANCE_MODE = false

export default function Home() {
  if (MAINTENANCE_MODE) {
    return (
      <div 
        className="min-h-screen relative bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center"
        style={{
          backgroundImage: 'url(/bg-purp-highlight.png)',
        }}
      >
        {/* Dark mode background overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-0 dark:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage: 'url(/bg5.png)',
          }}
        >
          {/* Starfield overlay for dark mode */}
          <Starfield />
        </div>
        
        {/* Optional overlay for better content readability */}
        <div className="absolute inset-0 bg-black/5 dark:bg-black/10"></div>
        
        {/* TEMPORARY MAINTENANCE PAGE */}
        <main className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="/FlyteAILogo.svg" 
                alt="FlyteAI" 
                className="h-16 mx-auto dark:hidden"
              />
              <img 
                src="/FlyteAILogoDarkMode.svg" 
                alt="FlyteAI" 
                className="h-16 mx-auto hidden dark:block"
              />
            </div>
            
            {/* Maintenance Message */}
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              We&apos;ll be right back!
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              FlyteAI is currently undergoing maintenance to improve your experience.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              We&apos;re working hard to get everything back online as quickly as possible.
            </p>
            
            {/* Status indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="animate-pulse w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Systems are being updated
              </span>
            </div>
            
            {/* Contact info */}
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Questions? Contact us at support@flyteai.com
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ORIGINAL HOMEPAGE CONTENT
  return (
    <div 
      className="min-h-screen relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: 'url(/bg-purp-highlight.png)',
      }}
    >
      {/* Dark mode background overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-0 dark:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: 'url(/bg5.png)',
        }}
      >
        {/* Starfield overlay for dark mode */}
        <Starfield />
      </div>
      
      {/* Optional overlay for better content readability */}
      <div className="absolute inset-0 bg-black/5 dark:bg-black/10"></div>
      
      <main className="flex min-h-screen flex-col relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center py-12 px-4 sm:px-6 lg:px-8">
          <HeroContent />
        </section>
        
        {/* Demo Video Section */}
        <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <DemoVideoSection />
        </section>

        {/* Airlines Section */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Integrated Airlines
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Book flights with leading airlines worldwide through our AI-powered platform
            </p>
          </div>
          <MarqueeDemo />
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the future of flight booking with our AI-powered platform
            </p>
          </div>
          <AnimatedTestimonialsDemo />
        </section>

        {/* Partners Section */}
        <section className="py-16">
          <div className="text-center mb-1">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
              Partners
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Powered by industry-leading technology partners
            </p>
          </div>
          <div className="container mx-auto px-4 flex justify-center">
            <Partners3DCard />
          </div>
        </section>

        {/* Waitlist Section */}
        <WaitlistSection />
        
        {/* Footer Section with transparent background */}
        <FooterSection className="bg-transparent" />
      </main>
    </div>
  );
}