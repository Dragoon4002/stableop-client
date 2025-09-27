"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useActiveAccount } from "thirdweb/react";
import { useChat } from "@ai-sdk/react";

const ChatBubble = ({
  message,
  role,
}: {
  message: string;
  role: "user" | "assistant";
}) => (
  <div
    className={cn(
      "w-full flex",
      role === "assistant" ? "justify-start" : "justify-end"
    )}
  >
    <div
      className={cn(
        "p-4 max-w-4/5 rounded-2xl border-2",
        role === "assistant" ? "bg-primary" : "bg-background"
      )}
    >
      {message}
    </div>
  </div>
);

const ChatArea = () => {
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const account = useActiveAccount();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    addToolResult,
  } = useChat({
    api: "/api/chat",
    onToolCall: async ({ toolCall }) => {
      if (!account) {
        addToolResult({
          toolCallId: toolCall.toolCallId,
          result: {
            error: "Account not found, please connect your account to continue",
          },
        });
        return;
      }

      console.log({ input: toolCall.args, name: toolCall.toolName });
    },
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    handleSubmit(e);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event("submit") as any;
      handleSendMessage(formEvent);
    }
  };

  return (
    <div className="col-span-2 rounded-2xl bg-card flex p-6 flex-col">
      <ScrollArea className="h-[80%] max-h-[65vh] pr-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message: Message) => (
            <ChatBubble
              key={message.id}
              message={
                typeof message.content === "string" ? message.content : ""
              }
              role={message.role}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <form
        onSubmit={handleSendMessage}
        className="h-[20%] rounded-2xl flex flex-col gap-3"
      >
        <Textarea
          placeholder="Message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="flex-1 border max-h-[10vh] rounded-xl text-white placeholder:text-gray-400 resize-none focus-visible:ring-0 p-4"
        />
        <Button
          type="submit"
          disabled={input.trim() === "" || isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
};

export default ChatArea;
