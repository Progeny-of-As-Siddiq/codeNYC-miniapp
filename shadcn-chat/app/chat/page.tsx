"use client";

import { TabbedChat } from "@/components/tabbed-chat";
import { MiniKitContextProvider } from "@/providers/MiniKitProvider";

export default function ChatPage() {
  return (
    <main className="flex min-h-screen flex-col pt-24">
      <MiniKitContextProvider>
        <TabbedChat />
      </MiniKitContextProvider>
    </main>
  );
}
 