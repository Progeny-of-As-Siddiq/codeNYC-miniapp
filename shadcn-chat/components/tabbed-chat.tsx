"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Chat } from "@/components/ui/chat"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Copy } from "lucide-react"
import { useAuth, type User } from "@/contexts/auth-context"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// Backend URL configuration
const getBackendUrl = () => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    }
    // In production, use the env variable (should be set to https://api.flyteai.io)
    return process.env.NEXT_PUBLIC_BACKEND_URL || '';
  }
  // Fallback for SSR
  return '';
};

// Utility function to generate dynamic dates
const getDynamicDates = () => {
  const today = new Date();
  const departureDate = new Date(today);
  departureDate.setDate(today.getDate() + 21); // 3 weeks from today
  
  const returnDate = new Date(today);
  returnDate.setDate(today.getDate() + 28); // 4 weeks from today
  
  const formatDate = (date: Date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };
  
  return {
    departure: formatDate(departureDate),
    return: formatDate(returnDate)
  };
};

type Message = {
  id: string
  content: string
  role: "user" | "assistant" | (string & {})
  isTyping?: boolean
}

interface ChatInstanceProps {
  mode: 'demo' | 'live'
  user: User | null
  isActive: boolean
}

function ChatInstance({ mode, user, isActive }: ChatInstanceProps) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      content: user 
        ? `✈️ Hi ${user.firstName}! I'm Flyte AI. Where are you headed?` 
        : mode === 'demo' 
          ? "✈️ Hi! I'm Flyte AI. Try me out in demo mode - where are you headed?" 
          : "✈️ Hi! I'm Flyte AI. Where are you headed?",
      role: "assistant"
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [chargeId, setChargeId] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

  // Get dynamic dates for suggestions
  const dynamicDates = getDynamicDates();

  // Set backend mode when component becomes active or mode changes
  useEffect(() => {
    if (!isActive) return;
    // Mode is now passed with each request, no need to set backend mode globally
  }, [mode, isActive]);

  // Update greeting when user state changes
  useEffect(() => {
    setMessages(prev => {
      const newMessages = [...prev];
      const greetingIndex = newMessages.findIndex(msg => msg.id === "greeting");
      if (greetingIndex !== -1) {
        // Check if we're in live mode
        const isLiveMode = mode === 'live';
        const usaRestrictionNote = isLiveMode ? " Currently supporting USA domestic flights only. 🇺🇸" : "";
        
        newMessages[greetingIndex] = {
          id: "greeting",
          content: user 
            ? `✈️ Hi ${user.firstName}! I'm Flyte AI.${usaRestrictionNote} Where are you headed?` 
            : mode === 'demo' 
              ? "✈️ Hi! I'm Flyte AI. Try me out in demo mode - where are you headed?" 
              : `✈️ Hi! I'm Flyte AI.${usaRestrictionNote} Where are you headed?`,
          role: "assistant"
        };
      }
      return newMessages;
    });
  }, [user, mode]);

  // Helper to extract charge_id from backend response
  function extractChargeId(content: string): string | null {
    // Match both /charges/ and /pay/ links
    const match = content.match(/commerce\.coinbase\.com\/(?:charges|pay)\/([a-zA-Z0-9-]+)/)
    return match ? match[1] : null;
  }

  // Poll payment status if chargeId is set
  useEffect(() => {
    if (!chargeId || !sessionId) return;
    let stopped = false;
    async function poll() {
      if (stopped) return;
      try {
        const res = await fetch(`${getBackendUrl()}/api/check-payment?charge_id=${chargeId}&session_id=${sessionId}`)
        const data = await res.json()
        if (data.status === "pending") {
          // Keep polling for payment
          pollingRef.current = setTimeout(poll, 5000)
        } else if (data.status === "completed") {
          // Show booking confirmation
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            content: data.message?.content || "🎟️ Booking confirmed!",
            role: "assistant"
          }])
          stopped = true;
          setChargeId(null)
        } else if (data.status === "error") {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            content: `❌ Payment error: ${data.message}`,
            role: "assistant"
          }])
          stopped = true;
          setChargeId(null)
        } else {
          // Keep polling
          pollingRef.current = setTimeout(poll, 5000)
        }
      } catch (e) {
        console.error("Error polling payment status:", e)
        pollingRef.current = setTimeout(poll, 5000)
      }
    }
    poll()
    return () => {
      stopped = true;
      if (pollingRef.current) clearTimeout(pollingRef.current)
    }
  }, [chargeId, sessionId])

  // Detect when a payment link is sent and extract charge_id
  useEffect(() => {
    const lastMsg = messages[messages.length - 1]
    if (lastMsg && lastMsg.role === "assistant") {
      const newChargeId = extractChargeId(lastMsg.content)
      if (newChargeId && newChargeId !== chargeId) {
        setChargeId(newChargeId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  }

  const handleSubmit = async (e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.()
    if (!input.trim()) return

    // Check if the user wants to start over
    if (input.toLowerCase() === "i wanna start over") {
      // Check if we're in live mode
      const isLiveMode = mode === 'live';
      const usaRestrictionNote = isLiveMode ? " Currently supporting USA domestic flights only. 🇺🇸" : "";
      
      setMessages([{
        id: "greeting",
        content: user 
          ? `✈️ Hi ${user.firstName}! I'm Flyte AI.${usaRestrictionNote} Where are you headed?` 
          : mode === 'demo' 
            ? "✈️ Hi! I'm Flyte AI. Try me out in demo mode - where are you headed?" 
            : `✈️ Hi! I'm Flyte AI.${usaRestrictionNote} Where are you headed?`,
        role: "assistant"
      }])
      setInput("")
      setSessionId(null)  // Clear session ID when starting over
      return
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user"
    }
    
    setMessages(prev => [...prev, newMessage])
    setInput("")
    setIsLoading(true)

    // Add a typing indicator message
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "",
      role: "assistant",
      isTyping: true
    }
    setMessages(prev => [...prev, typingMessage])
    
    try {
      const messagesForBackend = messages
        .filter(msg => !msg.isTyping)
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      
      messagesForBackend.push({
        role: "user",
        content: input
      })

      // Prepare user data for backend
      let userForBackend = user;
      
      // If in demo mode and no user is logged in, use fake demo data
      if (mode === 'demo' && !user) {
        userForBackend = {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          username: "demo_user",
          title: "mr",
          gender: "male",
          dob: "1990-01-01",
          phone: "+14155552671",
          profilePicture: "/defaultpfp.jpeg"
        };
      }

      const response = await fetch(`${getBackendUrl()}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messagesForBackend,
          session_id: sessionId,
          user: userForBackend,
          mode: mode  // Add current tab mode to request
        }),
        // Add 2-minute timeout for long flight searches
        signal: AbortSignal.timeout(120000) // 2 minutes in milliseconds
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `Failed to get response from AI (Status: ${response.status})`);
      }

      const data = await response.json()
      
      // Store the session ID if it's returned
      if (data.session_id) {
        setSessionId(data.session_id)
      }
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping))
      
      // Add AI response
      const responseMessage: Message = {
        id: Date.now().toString(),
        content: data.message.content,
        role: "assistant"
      }
      setMessages(prev => [...prev, responseMessage])
    } catch (error) {
      console.error("Error:", error)
      // Remove typing indicator and show error message
      setMessages(prev => prev.filter(msg => !msg.isTyping))
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant"
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const append = (message: { role: "user"; content: string }) => {
    if (!message.content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message.content,
      role: message.role
    };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    // Add a typing indicator message
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "",
      role: "assistant",
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    // Prepare messages for backend
    const messagesForBackend = [
      ...messages.filter(msg => !msg.isTyping).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: message.role, content: message.content }
    ];

    // Prepare user data for backend
    let userForBackend = user;
    
    // If in demo mode and no user is logged in, use fake demo data
    if (mode === 'demo' && !user) {
      userForBackend = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        username: "demo_user",
        title: "mr",
        gender: "male",
        dob: "1990-01-01",
        phone: "+14155552671",
        profilePicture: "/defaultpfp.jpeg"
      };
    }

    fetch(`${getBackendUrl()}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        messages: messagesForBackend,
        session_id: sessionId,
        user: userForBackend,
        mode: mode  // Add current tab mode to request
      }),
      // Add 2-minute timeout for long flight searches
      signal: AbortSignal.timeout(120000) // 2 minutes in milliseconds
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.detail || `Failed to get response from AI (Status: ${response.status})`);
        }
        const data = await response.json();
        
        // Store the session ID if it's returned
        if (data.session_id) {
          setSessionId(data.session_id)
        }
        
        setMessages(prev => prev.filter(msg => !msg.isTyping));
        const responseMessage: Message = {
          id: Date.now().toString(),
          content: data.message.content,
          role: "assistant"
        };
        setMessages(prev => [...prev, responseMessage]);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessages(prev => prev.filter(msg => !msg.isTyping));
        const errorMessage: Message = {
          id: Date.now().toString(),
          content: "Sorry, I encountered an error. Please try again.",
          role: "assistant"
        };
        setMessages(prev => [...prev, errorMessage]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const stop = () => {
    setIsLoading(false)
    setMessages(prev => prev.filter(msg => !msg.isTyping))
  }

  const resetConversation = () => {
    // Check if we're in live mode
    const isLiveMode = mode === 'live';
    const usaRestrictionNote = isLiveMode ? " Currently supporting USA domestic flights only. 🇺🇸" : "";
    
    setMessages([{
      id: "greeting",
      content: user 
        ? `✈️ Hi ${user.firstName}! I'm Flyte AI.${usaRestrictionNote} Where are you headed?` 
        : mode === 'demo' 
          ? "✈️ Hi! I'm Flyte AI. Try me out in demo mode - where are you headed?" 
          : `✈️ Hi! I'm Flyte AI.${usaRestrictionNote} Where are you headed?`,
      role: "assistant"
    }]);
    setInput("");
    setSessionId(null);
    setChargeId(null);
  };

  const copyAllMessages = useCallback(() => {
    const allMessages = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    navigator.clipboard.writeText(allMessages);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [messages]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col border rounded-lg md:rounded-2xl shadow bg-card p-0 px-2 md:px-4 overflow-hidden" style={{ height: 'calc(100vh - 14rem)' }}>
            <div className="flex flex-row items-center justify-between border-b px-2 md:px-6 py-2 md:py-4 relative">
        <div className="flex items-center">
        <span suppressHydrationWarning className={`font-bold text-sm md:text-lg${theme === "flyte-theme" ? " text-indigo-600" : ""}`}>
          {mode === 'demo' ? 'Flyte AI - Demo Mode' : 'Flyte AI - Live Mode'}
        </span>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="px-2 py-1 text-xs rounded-md cursor-help transition-all duration-200 border"
                  style={{
                    backgroundColor: '#9089fc20',
                    borderColor: '#9089fc40',
                    color: '#9089fc'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#9089fc30';
                    e.currentTarget.style.borderColor = '#9089fc60';
                    e.currentTarget.style.color = '#7c6df7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#9089fc20';
                    e.currentTarget.style.borderColor = '#9089fc40';
                    e.currentTarget.style.color = '#9089fc';
                  }}
                >
                  How To Use
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center" className="max-w-xs p-3">
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>How to use:</strong><br />
                    &ldquo;Hey I&apos;d like to fly from Chicago to San Francisco from July 15 to July 22&rdquo;
                  </div>
                  <div>
                    <strong>Current:</strong> Cheapest nonstop flights from A to B
                  </div>
                  <div>
                    <strong>Coming soon:</strong><br />
                    • Multi-stop flights (1, 2, 3+ stops)<br />
                    • Best date suggestions & planning<br />
                    • Advanced filtering options
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="px-2 py-1 text-xs rounded-md cursor-help transition-all duration-200 border"
                  style={{
                    backgroundColor: '#ff9f4020',
                    borderColor: '#ff9f4040',
                    color: '#ff9f40'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff9f4030';
                    e.currentTarget.style.borderColor = '#ff9f4060';
                    e.currentTarget.style.color = '#ff8c00';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff9f4020';
                    e.currentTarget.style.borderColor = '#ff9f4040';
                    e.currentTarget.style.color = '#ff9f40';
                  }}
                >
                  Beta Notice
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center" className="max-w-sm p-3">
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>⚠️ Beta Notice:</strong><br />
                    This service is currently in beta stages. We cannot guarantee refunds at this time.
                  </div>
                  <div>
                    For support or questions, please email us at{' '}
                    <a 
                      href="mailto:support@flyteai.io" 
                      className="text-[#9089fc] hover:underline font-medium"
                    >
                      support@flyteai.io
                    </a>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Button 
            onClick={copyAllMessages} 
            variant="outline" 
            size="sm"
            className={`flex items-center gap-1 md:gap-2 transition-all duration-200 ${isCopied ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}`}
          >
            <Copy className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-200" />
            <span className="hidden sm:inline">{isCopied ? 'Copied!' : 'Copy Transcript'}</span>
          </Button>
          <Button onClick={resetConversation} variant="outline" size="sm">Reset</Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-0 pb-2 md:pb-4 overflow-y-auto">
        <Chat
          className="grow"
          messages={messages}
          handleSubmit={handleSubmit}
          input={input}
          handleInputChange={handleInputChange}
          isGenerating={isLoading}
          stop={stop}
          append={append}
          allowAttachments={false}
          user={user ? {
            profilePicture: user.profilePicture,
            firstName: user.firstName,
            lastName: user.lastName
          } : undefined}
          suggestions={[
            "Find me a round-trip flight from New York to Los Angeles",
            `Book a flight from Dallas to Seattle, leaving ${dynamicDates.departure} and returning ${dynamicDates.return}`,
            "Show me the cheapest flight from Chicago to Miami"
          ]}
        />
      </div>
    </div>
  );
}

// Helper function to switch backend mode
async function switchBackendMode(mode: "demo" | "live") {
  try {
    const backendUrl = getBackendUrl();
    if (!backendUrl) {
      console.log("No backend URL configured, skipping backend mode switch");
      return;
    }

    const backendMode = mode === "demo" ? "mock" : "live";
    console.log(`[DEBUG] Switching backend to ${backendMode} mode`);

    const response = await fetch(`${backendUrl}/api/duffel-mode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mode: backendMode }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`[DEBUG] Backend mode switch failed: ${errorData.detail || 'Unknown error'}`);
      throw new Error(errorData.detail || 'Failed to switch backend mode');
    }

    const responseData = await response.json();
    console.log(`[DEBUG] Backend mode switch response:`, responseData);
    
  } catch (error) {
    console.error('[DEBUG] Error switching backend mode:', error);
    throw error;
  }
}

export function TabbedChat() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("demo");
  const [isAccessCodeVerified, setIsAccessCodeVerified] = useState(false);
  const [showAccessCodeDialog, setShowAccessCodeDialog] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [accessCodeError, setAccessCodeError] = useState("");

  // Initialize backend to demo mode on component mount
  useEffect(() => {
    const initializeMode = async () => {
      try {
        await switchBackendMode("demo");
        console.log("Backend initialized to demo mode");
      } catch (error) {
        console.error("Failed to initialize backend mode:", error);
      }
    };
    
    initializeMode();
  }, []);

  const handleTabChange = async (value: string) => {
    // If user tries to access live mode, check access code first
    if (value === "live" && !isAccessCodeVerified) {
      setShowAccessCodeDialog(true);
      return;
    }
    
    // If access code is verified but user is not logged in, redirect to login
    if (value === "live" && isAccessCodeVerified && !user) {
      router.push("/login");
      return;
    }
    
    // Switch backend mode when changing tabs
    try {
      await switchBackendMode(value as "demo" | "live");
      setActiveTab(value);
      toast.success(`Switched to ${value} mode`);
    } catch (error) {
      console.error('Failed to switch backend mode:', error);
      // Still allow the tab change for UI consistency
      setActiveTab(value);
      toast.error(`Backend unavailable, UI switched to ${value} mode`);
    }
  };

  const verifyAccessCode = async () => {
    if (!accessCode.trim()) {
      setAccessCodeError("Please enter an access code");
      return;
    }

    setIsVerifying(true);
    setAccessCodeError("");

    try {
      const response = await fetch(`${getBackendUrl()}/api/verify-access-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_code: accessCode.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setIsAccessCodeVerified(true);
        setShowAccessCodeDialog(false);
        setAccessCode("");
        // Don't directly set active tab - let the handleTabChange logic handle it
        // This will trigger the login check if user is not logged in
        handleTabChange("live");
      } else {
        setAccessCodeError(data.message || "Invalid access code");
      }
    } catch {
      setAccessCodeError("Error verifying access code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAccessCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyAccessCode();
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto px-4 py-2">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="demo">Demo Mode</TabsTrigger>
            <TabsTrigger value="live">Live Mode</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="demo" className="mt-0">
          <ChatInstance mode="demo" user={user} isActive={activeTab === "demo"} />
        </TabsContent>
        
        <TabsContent value="live" className="mt-0">
          <ChatInstance mode="live" user={user} isActive={activeTab === "live"} />
        </TabsContent>
      </Tabs>

      {/* Access Code Dialog */}
      <Dialog open={showAccessCodeDialog} onOpenChange={setShowAccessCodeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Access Code Required</DialogTitle>
            <DialogDescription>
              Please enter the access code to use Live Mode with real flight bookings.
              <br /><br />
              Don&apos;t have an access code?{" "}
              <Link 
                href="/#waitlist" 
                className="text-[#9089fc] hover:underline font-medium"
                onClick={() => setShowAccessCodeDialog(false)}
              >
                Join our waitlist
              </Link>{" "}
              to get exclusive early access codes and updates!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAccessCodeSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="access-code">Access Code</Label>
              <Input
                id="access-code"
                type="password"
                placeholder="Enter access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                disabled={isVerifying}
              />
              {accessCodeError && (
                <p className="text-sm text-red-500">{accessCodeError}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAccessCodeDialog(false)}
                disabled={isVerifying}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isVerifying}>
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 