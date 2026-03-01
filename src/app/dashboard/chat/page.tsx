"use client";

import { useState } from "react";
import { handleCampusAIChatQuery } from "@/ai/flows/handle-campus-ai-chat-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Bot, User, Sparkles, Clapperboard } from "lucide-react";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! I am your VIRIDIAN Sustainability Assistant. How can I help you analyze campus data or prepare a demo today?" }
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSend(customQuery?: string) {
    const finalQuery = customQuery || query;
    if (!finalQuery.trim()) return;

    setQuery("");
    setMessages(prev => [...prev, { role: "user", text: finalQuery }]);
    setLoading(true);

    try {
      const { response } = await handleCampusAIChatQuery({ query: finalQuery });
      setMessages(prev => [...prev, { role: "bot", text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "Sorry, I encountered an error while processing your request." }]);
    } finally {
      setLoading(false);
    }
  }

  const quickActions = [
    { label: "Generate Demo Script", query: "Give me a professional video recording script covering all VIRIDIAN AI features for a campus demo.", icon: Clapperboard },
    { label: "Energy Anomaly Score", query: "Which building has the highest energy anomaly score currently?", icon: Sparkles },
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
          <MessageSquare className="size-6" /> Campus AI Assistant
        </h2>
        <p className="text-muted-foreground">Ask questions or generate professional demo scripts for video recordings.</p>
      </div>

      <Card className="flex-1 overflow-hidden border-none shadow-sm flex flex-col">
        <CardHeader className="border-b bg-primary/5 py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="size-4 text-accent" /> Powered by AMD ROCm Edge Intelligence
            </CardTitle>
            <div className="flex gap-2">
              {quickActions.map((action, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-[10px] gap-1 px-2 border-primary/20 hover:bg-primary/5"
                  onClick={() => handleSend(action.query)}
                  disabled={loading}
                >
                  <action.icon className="size-3" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden relative">
          <ScrollArea className="h-full p-6">
            <div className="flex flex-col gap-6">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent/20 text-accent-foreground"}`}>
                    {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                  </div>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-secondary text-secondary-foreground rounded-tl-none shadow-sm border border-border/50"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center shrink-0">
                    <Bot className="size-4" />
                  </div>
                  <div className="bg-secondary text-secondary-foreground rounded-2xl rounded-tl-none px-4 py-2.5 text-sm animate-pulse border border-border/50">
                    Synthesizing features and Demo Scenarios...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-4 border-t bg-background">
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <Input 
              placeholder="e.g., Generate a demo script for my video recording..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" size="icon" disabled={loading} className="bg-primary text-white hover:bg-primary/90">
              <Send className="size-4" />
            </Button>
          </form>
          <p className="text-[10px] text-center text-muted-foreground mt-2">
            AI can generate scripts and insights. Verify critical data before broadcasting.
          </p>
        </div>
      </Card>
    </div>
  );
}
