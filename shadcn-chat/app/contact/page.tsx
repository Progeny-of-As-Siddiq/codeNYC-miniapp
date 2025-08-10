"use client";

import { useState } from "react";
import { Copy, Check, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const EmailCard = ({ 
    title, 
    email, 
    description 
  }: { 
    title: string; 
    email: string; 
    description: string;
  }) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-3 p-3 bg-muted rounded-lg">
          <a
            href={`mailto:${email}`}
            className="text-primary hover:underline font-mono text-sm flex-1"
          >
            {email}
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(email)}
            className="h-8 w-8 p-0"
          >
            {copiedEmail === email ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or need support? We&apos;d love to hear from you. 
            Reach out to our team directly.
          </p>
        </div>

        {/* Founders Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Users className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Meet Our Founders</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <EmailCard
              title="Founder Ebrahim"
              email="ebrahim@flyteai.io"
              description="Co-founder & CEO - Product vision, strategy, and partnerships"
            />
            
            <EmailCard
              title="Founder Umar"
              email="umar@flyteai.io"
              description="Co-founder & CTO - Technology, engineering, and innovation"
            />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Team Email */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Mail className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">General Inquiries</h2>
          </div>
          
          <div className="max-w-md mx-auto">
            <EmailCard
              title="Team Email"
              email="team@flyteai.io"
              description="General support, partnerships, and business inquiries"
            />
          </div>
        </div>


      </div>
    </main>
  );
} 