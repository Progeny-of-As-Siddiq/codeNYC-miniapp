import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function RoadmapPage() {
  const data = [
    {
      title: "Q3 2025",
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">Phase 1</h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-800 dark:text-neutral-200 text-sm md:text-base">
            <li>Launch fully agentic checkout system with advanced AI decision-making capabilities</li>
            <li>Begin collaborations with major airline partners</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Q1 2026",
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">Phase 2</h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-800 dark:text-neutral-200 text-sm md:text-base">
            <li>Deploy voice-based assistant with natural language understanding and real-time processing</li>
            <li>Launch $FLYTE token for payments, governance, and loyalty</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Q2 2026",
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">Phase 3</h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-800 dark:text-neutral-200 text-sm md:text-base">
            <li>Scale the product to support 1M+ users</li>
            <li>Release Flyte to more countries and regions</li>
            <li>Introduce $FLYTE token ecosystem for governance, loyalty, and utility</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Q4 2026",
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">Phase 4</h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-800 dark:text-neutral-200 text-sm md:text-base">
            <li>Launch native mobile applications with offline capabilities and push notifications</li>
            <li>Begin hotel and Airbnb bookings on Flyte</li>
            <li>Expand partnerships with travel and hospitality providers</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2027+",
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">Future Vision</h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-800 dark:text-neutral-200 text-sm md:text-base">
            <li>Integrate multi-modal travel (trains, buses, rideshare)</li>
            <li>Personalized AI travel concierge for every user</li>
            <li>Dynamic pricing and rewards powered by AI and blockchain</li>
            <li>Expand to new verticals: experiences, insurance, and more</li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
} 