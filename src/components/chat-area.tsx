"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useActiveAccount } from "thirdweb/react";
import { useChat } from "@ai-sdk/react";
import { ChatMessage } from "@/lib/ai/contract-tools-schema";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import { borrowFunds } from "@/lib/ai/thirdweb-functions";

const ChatArea = () => {
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const account = useActiveAccount();

  const { messages, status, sendMessage, addToolResult, error, stop } =
    useChat<ChatMessage>({
      transport: new DefaultChatTransport({
        api: "/api/chat",
      }),
      onToolCall: async ({ toolCall }) => {
        // Handle different tools
        let result = "";
        const input = toolCall.input as any; // Type assertion for tool input

        switch (toolCall.toolName) {
          case "borrowFunds":
            result = `Borrow request initiated for ${input.amount} USD`;
            const borrowRes = await borrowFunds({ amount: input.amount });
            addToolResult({
              tool: "borrowFunds",
              state: "output-available",
              output: { text: borrowRes },
              toolCallId: toolCall.toolCallId,
            });
            break;

          case "lendFunds":
            result = `Lending ${input.amount} USD to the protocol`;
            break;

          case "repayLoan":
            result = `Repaying loan ${input.loanId} with amount ${input.amount} USD`;
            break;

          case "withdrawCollateral":
            result = `Withdrawing ${input.amount} collateral from loan ${input.loanId}`;
            break;

          default:
            result = `Unknown tool: ${toolCall.toolName}`;
        }
      },
    });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    sendMessage({
      text: input,
    });

    setInput("");
  };

  console.log(messages);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="col-span-2 rounded-2xl bg-card flex p-6 flex-col">
      <ScrollArea className="h-[80%] max-h-[65vh] pr-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((item) => (
            <div
              key={item.id}
              className={cn(
                "w-full flex",
                item.role === "assistant" ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "p-4 max-w-4/5 rounded-2xl border-2",
                  item.role === "assistant" ? "bg-primary" : "bg-background"
                )}
              >
                {item.parts.map((part, idx) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <div
                          key={`${item.id}-${idx}`}
                          className="prose dark:prose-invert"
                        >
                          <ReactMarkdown>{part.text}</ReactMarkdown>
                        </div>
                      );

                    case "tool-borrowFunds":
                      switch (part.state) {
                        case "input-streaming":
                          return (
                            <div key={`${item.id}`}>Fetching input...</div>
                          );
                        case "input-available":
                          return (
                            <div key={`${item.id}`}>
                              Trying to borrow {part.input?.amount}
                            </div>
                          );

                        case "output-available":
                          return (
                            <div key={`${item.id}`}>
                              Txn executed succesfully
                            </div>
                          );

                        case "output-error":
                          return (
                            <div key={`${item.id}`}>Txn Error detected</div>
                          );
                        default:
                          return null;
                      }

                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <form
        onSubmit={handleSubmit}
        className="h-[20%] rounded-2xl flex flex-col gap-3"
      >
        <Textarea
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
