"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Chat } from "@/components/ui/chat"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Copy } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

export function ChatDemo() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [hasChatStarted, setHasChatStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      content: user ? `✈️ Hi ${user.firstName}! I'm Flyte AI. Where are you headed?` : "✈️ Hi! I'm Flyte AI. Where are you headed?",
      role: "assistant"
    }
  ])

  // Always reset to mock mode when component mounts or remounts
  useEffect(() => {
    const resetToMockMode = async () => {
      try {
        const backendUrl = getBackendUrl();
        if (!backendUrl) {
          console.log("No backend URL configured, skipping mode reset");
          setIsLiveMode(false);
          localStorage.setItem('duffelMode', 'mock');
          return;
        }

        // First set backend to mock mode
        const response = await fetch(`${backendUrl}/api/duffel-mode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mode: 'mock' }),
        });

        if (response.ok) {
          // Then update UI to match
          setIsLiveMode(false);
          localStorage.setItem('duffelMode', 'mock');
          console.log("\n=== Mode Diagnostic Info ===");
          console.log("Backend and UI reset to MOCK mode");
          console.log("===========================\n");
        } else {
          console.log("Backend not available, defaulting to mock mode");
          setIsLiveMode(false);
          localStorage.setItem('duffelMode', 'mock');
        }
      } catch (error) {
        console.log("Backend not available, defaulting to mock mode:", error instanceof Error ? error.message : String(error));
        setIsLiveMode(false);
        localStorage.setItem('duffelMode', 'mock');
      }
    };

    resetToMockMode();
  }, []); // Empty dependency array means this runs on mount/remount

  // Load initial mode from localStorage and log diagnostic info
  useEffect(() => {
    const savedMode = localStorage.getItem('duffelMode');
    if (savedMode) {
      setIsLiveMode(savedMode === 'live');
    }
    
    // Log diagnostic info
    console.log("\n=== Mode Diagnostic Info ===");
    console.log(`Current Mode: ${savedMode === 'live' ? 'LIVE' : 'MOCK'}`);
    console.log(`Mode from localStorage: ${savedMode || 'not set'}`);
    console.log(`UI Switch State: ${isLiveMode ? 'LIVE' : 'MOCK'}`);
    console.log("===========================\n");
  }, [isLiveMode]);

  // Update greeting when user state changes
  useEffect(() => {
    setMessages(prev => {
      const newMessages = [...prev];
      const greetingIndex = newMessages.findIndex(msg => msg.id === "greeting");
      if (greetingIndex !== -1) {
        // Check if we're in live mode
        const usaRestrictionNote = isLiveMode ? " Currently supporting USA domestic flights only. 🇺🇸" : "";
        
        newMessages[greetingIndex] = {
          id: "greeting",
          content: user ? `✈️ Hi ${user.firstName}! I'm Flyte AI.${usaRestrictionNote} Where are you headed?` : `✈️ Hi! I'm Flyte AI.${usaRestrictionNote} Where are you headed?`,
          role: "assistant"
        };
      }
      return newMessages;
    });
  }, [user, isLiveMode]);

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [chargeId, setChargeId] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

  const handleModeSwitch = async (checked: boolean) => {
    if (isSwitching || hasChatStarted) return;
    
    setIsSwitching(true);
    const newMode = checked ? 'live' : 'mock';
    console.log(`[DEBUG] Switching to ${newMode} mode`);
    
    try {
      const backendUrl = getBackendUrl();
      if (!backendUrl) {
        console.log("No backend URL configured, updating UI only");
        setIsLiveMode(checked);
        localStorage.setItem('duffelMode', newMode);
        toast.success(`UI switched to ${newMode} mode (backend not available)`);
        return;
      }

      const response = await fetch(`${backendUrl}/api/duffel-mode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: newMode }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`[DEBUG] Mode switch failed: ${errorData.detail || 'Unknown error'}`);
        throw new Error(errorData.detail || 'Failed to switch mode');
      }
      
      const responseData = await response.json();
      console.log(`[DEBUG] Mode switch response:`, responseData);
      
      setIsLiveMode(checked);
      localStorage.setItem('duffelMode', newMode);
      toast.success(`Switched to ${newMode} mode`);
    } catch (error) {
      console.error('[DEBUG] Error switching mode:', error);
      // Still update the UI even if backend fails
      setIsLiveMode(checked);
      localStorage.setItem('duffelMode', newMode);
      toast.error(`Backend unavailable, UI switched to ${newMode} mode`);
    } finally {
      setIsSwitching(false);
    }
  };

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

    // Set hasChatStarted to true when user sends first message
    if (!hasChatStarted) {
      setHasChatStarted(true);
    }

    // Check if the user wants to start over
    if (input.toLowerCase() === "i wanna start over") {
      // Check if we're in live mode
      const usaRestrictionNote = isLiveMode ? " Currently supporting USA domestic flights only. 🇺🇸" : "";
      
      setMessages([{
        id: "greeting",
        content: user ? `✈️ Hi ${user.firstName}! I'm Flyte AI.${usaRestrictionNote} Where are you headed?` : `✈️ Hi! I'm Flyte AI.${usaRestrictionNote} Where are you headed?`,
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

      const response = await fetch(`${getBackendUrl()}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messagesForBackend,
          session_id: sessionId,
          user: user || null,
          mode: "demo"  // Chat-demo is always demo mode
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

    fetch(`${getBackendUrl()}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        messages: messagesForBackend,
        session_id: sessionId,
        user: user || null,
        mode: "demo"  // Chat-demo is always demo mode
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
    const usaRestrictionNote = isLiveMode ? " Currently supporting USA domestic flights only. 🇺🇸" : "";
    
    setMessages([{
      id: "greeting",
      content: user ? `✈️ Hi ${user.firstName}! I'm Flyte AI.${usaRestrictionNote} Where are you headed?` : `✈️ Hi! I'm Flyte AI.${usaRestrictionNote} Where are you headed?`,
      role: "assistant"
    }]);
    setInput("");
    setSessionId(null);
    setChargeId(null);
    setHasChatStarted(false);  // Reset hasChatStarted when conversation is reset
  };

  const copyAllMessages = useCallback(() => {
    const allMessages = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    navigator.clipboard.writeText(allMessages);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [messages]);

  // Get dynamic dates for suggestions
  const dynamicDates = getDynamicDates();

  return (
    <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto p-0">
      <div className="flex flex-col space-y-2">
        <div className="w-full max-w-4xl mx-auto flex flex-col border rounded-lg md:rounded-2xl shadow bg-card p-0 px-2 md:px-4 overflow-hidden" style={{ height: 'calc(100vh - 10rem)' }}>
          <div className="flex flex-row items-center justify-between border-b px-2 md:px-6 py-2 md:py-4 relative">
            <div className="flex items-center">
              <span suppressHydrationWarning className={`font-bold text-sm md:text-lg${theme === "flyte-theme" ? " text-indigo-600" : ""}`}>{theme === "flyte-theme" ? "Flyte AI" : "Flyte AI"}</span>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
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
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="flex items-center gap-2 mr-2">
                <Switch
                  id="mode-switch"
                  checked={isLiveMode}
                  onCheckedChange={handleModeSwitch}
                  disabled={hasChatStarted || isSwitching}
                />
                <Label htmlFor="mode-switch" className="text-sm font-medium">
                  {isLiveMode ? "Live Mode" : "Mock Mode"}
                </Label>
              </div>
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
              <ModeToggle />
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
      </div>
    </div>
  );
}