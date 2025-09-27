"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  user: "ai" | "user";
  timestamp: Date;
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hello! Can you help me analyze this data?",
    user: "user",
    timestamp: new Date("2025-01-15T10:30:00Z"),
  },
  {
    id: "2",
    content:
      "Of course! I'd be happy to help you analyze your data. Could you please share the dataset or tell me more about what specific analysis you're looking for?",
    user: "ai",
    timestamp: new Date("2025-01-15T10:30:15Z"),
  },
  {
    id: "3",
    content:
      "I have sales data from the last quarter and need to identify trends and patterns.",
    user: "user",
    timestamp: new Date("2025-01-15T10:31:00Z"),
  },
  {
    id: "4",
    content:
      "Great! For quarterly sales analysis, I can help you with trend analysis, seasonal patterns, growth rates, and performance metrics. Please upload your data file or describe the data structure you're working with.",
    user: "ai",
    timestamp: new Date("2025-01-15T10:31:30Z"),
  },
  {
    id: "5",
    content:
      "The data includes columns for date, product_id, sales_amount, and region. I'm particularly interested in regional performance.",
    user: "user",
    timestamp: new Date("2025-01-15T10:32:00Z"),
  },
];

const ChatBubble = ({
  message,
  user,
}: {
  message: string;
  user: "ai" | "user";
}) => (
  <div
    className={cn(
      "w-full flex",
      user === "ai" ? "justify-start" : "justify-end"
    )}
  >
    <div
      className={cn(
        "p-4 max-w-4/5 rounded-2xl border-2",
        user === "ai" ? "bg-primary" : "bg-background"
      )}
    >
      {message}
    </div>
  </div>
);

const ChatArea = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      user: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for your message! I'm processing your request and will provide a detailed response shortly.",
        user: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="col-span-2 rounded-2xl bg-card flex p-6 flex-col">
      <ScrollArea className="h-[80%] max-h-[65vh] pr-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.content}
              user={message.user}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="h-[20%] rounded-2xl flex flex-col gap-3">
        <Textarea
          placeholder="Message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border max-h-[10vh] rounded-xl text-white placeholder:text-gray-400 resize-none focus-visible:ring-0 p-4"
        />
        <Button
          onClick={handleSendMessage}
          disabled={inputValue.trim() === ""}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatArea;
