"use client";

import React from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function Partners3DCard() {
  return (
    <CardContainer className="inter-var" containerClassName="py-4 flex items-center justify-center">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[32rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Coinbase Partnership
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-lg mt-2 dark:text-neutral-300"
        >
          Featured by Coinbase Developer Platform for our innovative AI-powered crypto payment integration
        </CardItem>
        <CardItem 
          translateZ="100" 
          className="w-full mt-4"
          as="a"
          href="https://x.com/coinbasedev/status/1938673788788580849?s=42"
          target="_blank"
        >
          {/* Light mode image */}
          <Image
            src="/cb_tweet_light.png"
            height={320}
            width={480}
            className="h-auto w-full object-contain rounded-xl group-hover/card:shadow-xl dark:hidden cursor-pointer transition-transform duration-200 hover:scale-105"
            alt="Coinbase Developer Platform Partnership"
          />
          {/* Dark mode image */}
          <Image
            src="/cb_tweet_dark.png"
            height={320}
            width={480}
            className="h-auto w-full object-contain rounded-xl group-hover/card:shadow-xl hidden dark:block cursor-pointer transition-transform duration-200 hover:scale-105"
            alt="Coinbase Developer Platform Partnership"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
} 