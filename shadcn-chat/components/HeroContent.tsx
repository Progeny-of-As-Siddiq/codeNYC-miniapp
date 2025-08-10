"use client"

import { Globe } from "@/components/magicui/globe"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Major cities coordinates
const MAJOR_CITIES = [
  // North America
  { location: [41.8781, -87.6298] as [number, number], size: 0.15 }, // Chicago
  { location: [40.7128, -74.0060] as [number, number], size: 0.15 }, // New York
  { location: [34.0522, -118.2437] as [number, number], size: 0.15 }, // Los Angeles
  { location: [38.5816, -121.4944] as [number, number], size: 0.15 }, // Sacramento
  { location: [47.6062, -122.3321] as [number, number], size: 0.15 }, // Seattle
  { location: [49.2827, -123.1207] as [number, number], size: 0.15 }, // Vancouver
  
  // Middle East
  { location: [21.4225, 39.8262] as [number, number], size: 0.15 }, // Makkah
  { location: [24.5247, 39.5692] as [number, number], size: 0.15 }, // Madinah
  { location: [25.2048, 55.2708] as [number, number], size: 0.15 }, // Dubai
  { location: [31.9539, 35.9106] as [number, number], size: 0.15 }, // Amman
  
  // Pakistan
  { location: [33.6844, 73.0479] as [number, number], size: 0.15 }, // Islamabad
  { location: [24.8607, 67.0011] as [number, number], size: 0.15 }, // Karachi
  
  // Europe
  { location: [51.5074, -0.1278] as [number, number], size: 0.15 }, // London
  { location: [48.8566, 2.3522] as [number, number], size: 0.15 }, // Paris
  { location: [52.5200, 13.4050] as [number, number], size: 0.15 }, // Berlin
  { location: [41.9028, 12.4964] as [number, number], size: 0.15 }, // Rome
  
  // Asia
  { location: [35.6762, 139.6503] as [number, number], size: 0.15 }, // Tokyo
  { location: [31.2304, 121.4737] as [number, number], size: 0.15 }, // Shanghai
  { location: [1.3521, 103.8198] as [number, number], size: 0.15 }, // Singapore
  { location: [19.0760, 72.8777] as [number, number], size: 0.15 }, // Mumbai
  
  // Australia
  { location: [-33.8688, 151.2093] as [number, number], size: 0.15 }, // Sydney
  { location: [-37.8136, 144.9631] as [number, number], size: 0.15 }, // Melbourne
  
  // Africa
  { location: [-33.9249, 18.4241] as [number, number], size: 0.15 }, // Cape Town
  { location: [30.0444, 31.2357] as [number, number], size: 0.15 }, // Cairo
  { location: [-1.2921, 36.8219] as [number, number], size: 0.15 }, // Nairobi
]

export function HeroContent() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? theme === "dark" : false

  const handleTryDemo = () => {
    router.push('/chat')
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="mb-8">
            <Image
              src={isDark ? "/FlyteAILogoDarkMode.svg" : "/FlyteAILogo.svg"}
              alt="Flyte AI Logo"
              width={400}
              height={112}
              priority
              className="max-w-[280px] sm:max-w-[400px] w-full h-auto"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span>Book </span>
            <span className="text-[#9089fc]">flights</span>
            <span> with </span>
            <span className="text-[#9089fc]">crypto</span>
            <span>, instantly. Powered by </span>
            <span className="text-[#9089fc]">AI</span>
            <span>.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Flyte is the fastest way to book flights using USDC, ETH, or fiat. Chat with our AI assistant and travel the world in minutes.
          </p>
          <div className="flex gap-4">
            <ShimmerButton 
              shimmerColor="#9089fc"
              className="shadow-2xl"
              background={isDark ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)"}
              shimmerSize="0.3em"
              onClick={handleTryDemo}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:text-black lg:text-lg">
                Try Demo
              </span>
            </ShimmerButton>
          </div>
        </div>
        
        {/* Right Column - Globe (visible on all screens) */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
          <div className="absolute inset-0">
            {mounted && (
              <Globe 
                className="w-full h-full" 
                rotationSpeed={0.0015}
                config={{ 
                  dark: isDark ? 1 : 0,
                  glowColor: [0.565, 0.537, 0.988],
                  markerColor: [0.565, 0.537, 0.988],
                  mapBrightness: 1.2,
                  diffuse: 0.4,
                  markers: MAJOR_CITIES,
                  mapSamples: 16000,
                  mapBaseBrightness: 0.1,
                  baseColor: [1, 1, 1]
                }} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 