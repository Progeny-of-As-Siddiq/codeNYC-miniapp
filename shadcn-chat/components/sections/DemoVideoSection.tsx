"use client";

import React from "react";

export function DemoVideoSection() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
          See Flyte AI in Action
        </h2>
      </div>
      
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#9089fc]/20 to-[#9089fc]/5 p-2">
          <video
            src="/FlyteAI-CDP.mp4"
            controls
            loop
            muted
            autoPlay
            className="w-full h-full object-cover rounded-xl"
            poster="/video-poster.jpg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Optional: Add a subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#9089fc]/10 to-transparent pointer-events-none -z-10 blur-xl transform scale-105"></div>
      </div>
    </div>
  );
} 