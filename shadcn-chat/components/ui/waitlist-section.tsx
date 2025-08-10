"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Check, Sparkles, AlertCircle } from "lucide-react";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/join-waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.detail || 'Failed to join waitlist');
      }

      if (result.already_signed_up) {
        setAlreadySignedUp(true);
        setEmail("");
        return;
      }

      console.log('Waitlist signup successful:', result);
      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
      setError(error instanceof Error ? error.message : "Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="waitlist" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
              Join the Waitlist
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Be among the first to experience the future of AI-powered flight booking
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <Card className="bg-transparent border-green-200/50 dark:border-green-800/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">
                  You&apos;re on the list!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  We&apos;ll notify you as soon as we launch. Get ready for exclusive early access!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (alreadySignedUp) {
    return (
      <section id="waitlist" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
              Join the Waitlist
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Be among the first to experience the future of AI-powered flight booking
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <Card className="bg-transparent border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Check className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">
                  You&apos;re already signed up!
                </h3>
                <p className="text-blue-700 dark:text-blue-300">
                  We&apos;ll keep you updated with our latest news and updates.
                </p>
                <Button 
                  onClick={() => setAlreadySignedUp(false)}
                  className="mt-4 bg-[#9089fc] hover:bg-[#7a75d8] text-white"
                >
                  Try Another Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
            Join the Waitlist
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Be among the first to experience the future of AI-powered flight booking
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="h-5 w-5 text-[#9089fc]" />
            <span className="text-sm font-medium text-[#9089fc]">
              Keep in touch with our updates
            </span>
            <Sparkles className="h-5 w-5 text-[#9089fc]" />
          </div>
        </div>
        
        <div className="max-w-md mx-auto">
          <Card className="bg-transparent border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white dark:bg-gray-900 border-purple-200 dark:border-purple-800 focus:border-[#9089fc] focus:ring-[#9089fc]"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#9089fc] hover:bg-[#7a75d8] text-white"
                  disabled={isSubmitting || !email.trim()}
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}
              
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  We&apos;ll send you exclusive updates and early access codes. No spam, ever.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 