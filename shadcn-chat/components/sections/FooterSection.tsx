"use client";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "@/components/ui/footer";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  columns?: FooterColumnProps[];
  copyright?: string;
  className?: string;
}

export default function FooterSection({
  columns = [
    {
      title: "Disclaimers",
      links: [
        { text: "Terms of Service", href: "/terms" },
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Sustainability", href: "/sustainability" },
        { text: "AI for Good", href: "/ai-for-good" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Docs", href: "/docs" },
        { text: "FAQ", href: "/faq" },
        { text: "Roadmap", href: "/roadmap" },
      ],
    },
    {
      title: "Company",
      links: [
        // { text: "About", href: "/about" }, // Commented out for future use
        { text: "Contact Us", href: "/contact" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved`,
  className,
}: FooterProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && theme === "dark" ? "/FlyteAILogoDarkMode.svg" : "/FlyteAILogo.svg";

  return (
    <footer className={cn("w-full px-4", className || "bg-background")}>
      <div className="max-w-container mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <Image
                  src={logoSrc}
                  alt="Flyte AI Logo"
                  width={120}
                  height={34}
                  className="h-8 w-auto"
                />
              </div>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-muted-foreground text-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
} 