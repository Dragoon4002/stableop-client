// lib/contract-tools.ts
import { tool } from "ai";
import { z } from "zod";

export const contractTools = {
  borrowFunds: tool({
    description: "Borrow funds from the lending protocol",
    inputSchema: z.object({
      amount: z.string().describe("Amount to borrow in ETH"),
      collateralAmount: z.string().describe("Collateral amount in ETH"),
    }),
  }),

  lendFunds: tool({
    description: "Lend funds to the protocol",
    inputSchema: z.object({
      amount: z.string().describe("Amount to lend in ETH"),
    }),
  }),

  repayLoan: tool({
    description: "Repay an existing loan",
    inputSchema: z.object({
      loanId: z.string().describe("ID of the loan to repay"),
      amount: z.string().describe("Amount to repay in ETH"),
    }),
  }),

  withdrawCollateral: tool({
    description: "Withdraw collateral from a loan",
    inputSchema: z.object({
      loanId: z.string().describe("ID of the loan"),
      amount: z.string().describe("Amount of collateral to withdraw"),
    }),
  }),
};
