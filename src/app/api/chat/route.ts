import { convertToModelMessages, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { contractTools } from "@/lib/ai/contract-tools-schema";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("gemini-2.5-pro"),
    messages: convertToModelMessages(messages),
    tools: contractTools,
    system: `You are a DeFi assistant that helps users interact with a borrowing and lending protocol. 
    When users want to:
    - Borrow money: Use borrowFunds tool
    - Lend money: Use lendFunds tool  
    - Repay loans: Use repayLoan tool
    - Withdraw collateral: Use withdrawCollateral tool
    
    Always confirm the action details with the user before proceeding.
    Be helpful and explain what each action does.`,
  });

  return result.toUIMessageStreamResponse();
}
