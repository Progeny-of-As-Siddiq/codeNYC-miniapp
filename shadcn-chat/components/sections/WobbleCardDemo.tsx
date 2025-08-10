"use client";

import React from "react";
import Image from "next/image";
import { WobbleCard } from "../ui/wobble-card";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 h-full bg-[#9089fc] min-h-[400px]"
        className=""
      >
        <div className="max-w-sm">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Backed by the Vision of Crypto&apos;s Future
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Brian Armstrong on why AI + crypto is inevitable
          </p>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Flyte is building the future of travel at the intersection of AI and crypto.
          </p>
        </div>
        <Image
          src="/brian_armstrong_tweet.png"
          width={320}
          height={320}
          alt="Brian Armstrong Tweet"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 object-contain rounded-2xl"
        />
      </WobbleCard>
      
      <WobbleCard containerClassName="col-span-1 min-h-[400px]">
        <div className="max-w-sm">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Your Personal AI Travel Agent
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Just say where and when — we&apos;ll handle the rest.
          </p>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Chat with Flyte&apos;s intelligent assistant to find and book flights in minutes.
          </p>
        </div>
        {/* Flyte Coin Image */}
        <Image
          src="/flyte_coin.png"
          width={80}
          height={80}
          alt="Flyte Coin"
          className="absolute right-6 top-6 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
} 