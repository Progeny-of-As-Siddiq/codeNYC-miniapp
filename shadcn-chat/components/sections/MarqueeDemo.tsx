"use client";

import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
import React from "react";

const airlines = [
  {
    name: "British Airways",
    logo: "/airline-logos/British_Airways-Logo.wine.svg",
  },
  {
    name: "Lufthansa",
    logo: "/airline-logos/Lufthansa-Logo.wine.svg",
  },
  {
    name: "Emirates",
    logo: "/airline-logos/Emirates_(airline)-Logo.wine.svg",
  },
  {
    name: "Singapore Airlines",
    logo: "/airline-logos/Singapore_Airlines-Logo.wine.svg",
  },
  {
    name: "Aegean Airlines",
    logo: "/airline-logos/Aegean_Airlines-Logo.wine.svg",
  },
  {
    name: "Avianca",
    logo: "/airline-logos/Avianca-Logo.wine.svg",
  },
  {
    name: "Brussels Airlines",
    logo: "/airline-logos/Brussels_Airlines-Logo.wine.svg",
  },
  {
    name: "Copa Airlines",
    logo: "/airline-logos/Copa_Airlines-Logo.wine.svg",
  },
  {
    name: "easyJet",
    logo: "/airline-logos/EasyJet-Logo.wine.svg",
  },
  {
    name: "Hawaiian Airlines",
    logo: "/airline-logos/Hawaiian_Airlines-Logo.wine.svg",
  },
  {
    name: "Iberia",
    logo: "/airline-logos/Iberia_(airline)-Logo.wine.svg",
  },
  {
    name: "Iberia Express",
    logo: "/airline-logos/Iberia_Express-Logo.wine.svg",
  },
  {
    name: "Jetstar",
    logo: "/airline-logos/Jetstar_Airways-Logo.wine.svg",
  },
  {
    name: "Swiss",
    logo: "/airline-logos/Swiss_International_Air_Lines-Logo.wine.svg",
  },
  {
    name: "Vueling Airlines",
    logo: "/airline-logos/Vueling-Logo.wine.svg",
  },
  {
    name: "Spirit Airlines",
    logo: "/airline-logos/Spirit_Airlines-Logo.wine.svg",
  },
  {
    name: "Transavia",
    logo: "/airline-logos/Transavia-Logo.wine.svg",
  },
  {
    name: "Volaris",
    logo: "/airline-logos/Volaris-Logo.wine.svg",
  },
  {
    name: "Eurowings",
    logo: "/airline-logos/Eurowings-Logo.wine.svg",
  },
];

const AirlineCard = ({
  name,
  logo,
}: {
  name: string;
  logo: string;
}) => {
  return (
    <div className="relative h-32 w-44 cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center p-6">
      <Image
        src={logo}
        alt={`${name} logo`}
        width={128}
        height={80}
        className="max-w-full max-h-full object-contain filter hover:brightness-110 transition-all duration-300"
      />
    </div>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-6xl">
        <Marquee pauseOnHover className="[--duration:40s]">
          {airlines.map((airline, index) => (
            <AirlineCard key={`${airline.name}-${index}`} {...airline} />
          ))}
        </Marquee>
        {/* Fade gradients positioned relative to the marquee container */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
} 