"use client"
import ChatArea from "@/components/chat-area";
import DataTable from "@/components/main-components/data-table";
import TopCard from "@/components/main-components/top-card";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { lendFunds, borrowFunds, approveToken, collateral } from "@/lib/ai/thirdweb-functions";
import { useActiveAccount } from "thirdweb/react";
import React, { useState, useEffect } from "react";
import { defineChain, getContract, readContract } from "thirdweb";
import { client } from "@/lib/thirdweb-client";

interface PoolStatus {
  liquidity: number;
  borrowed: number;
  utilizationRate: number;
}

interface LendRecord {
  amount: string;
  createdAt: string;
  duration: string;
  approxReturns: string;
  active: boolean;
}

interface BorrowRecord {
  amount: string;
  borrowedAt: string;
  duration: string;
  repayDate: string;
  lockedCollateral: string;
  active: boolean;
}

const Dashboard = () => {
  const account = useActiveAccount();
  const [poolStatus, setPoolStatus] = useState<PoolStatus | null>(null);
  const [lendRecords, setLendRecords] = useState<LendRecord[]>([]);
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>([]);
  const [recordsLoading, setRecordsLoading] = useState(false);
  

  const fetchPoolStatus = async () => {
    try {
      const response = await fetch("/api/pool-status");
      const data = await response.json();
      console.log("Pool:", data);
      
      if (data.liquidity !== undefined) {
        setPoolStatus({
          liquidity: data.liquidity,
          borrowed: data.borrowed,
          utilizationRate: data.utilizationRate,
        });
      }
    } catch (error) {
      console.error("Error fetching pool status:", error);
    }
  };

  useEffect(() => {
    fetchPoolStatus();
  }, []);

  useEffect(() => {
    if (account?.address) {
      fetchUserRecords();
    }
  }, [account?.address]);

  const fetchUserRecords = async () => {
    if (!account?.address) {
      console.log("No account address available");
      return;
    }
    
    setRecordsLoading(true);
    try {
      const response = await fetch("/api/user-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAddress: account.address,
        }),
      });
      const data = await response.json();
      console.log("Records:", data?.data);
      
      if (data?.data && Array.isArray(data.data) && data.data.length >= 2) {
        const [lends, borrows] = data.data;
        
        // Safely set lend records with null filtering
        const safeLends = Array.isArray(lends) ? lends.filter(record => record != null) : [];
        setLendRecords(safeLends);
        
        // Safely set borrow records with null filtering
        const safeBorrows = Array.isArray(borrows) ? borrows.filter(record => record != null) : [];
        setBorrowRecords(safeBorrows);
      } else {
        // Reset to empty arrays if no valid data
        setLendRecords([]);
        setBorrowRecords([]);
      }
    } catch (error) {
      console.error("Error fetching user records:", error);
      // Reset to empty arrays on error
      setLendRecords([]);
      setBorrowRecords([]);
    } finally {
      setRecordsLoading(false);
    }
  };

  const handleLending = async () => {
    if (!account) {
      console.log("No active account");
      return;
    }
    
    // First approve token spending (assuming PYUSD token address from the contract explorer)
    const tokenAddress = "0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9"; // PYUSD on Sepolia
    const amount = 100;
    
    console.log("Approving token...");
    const approvalResult = await approveToken({ tokenAddress, amount }, account);
    console.log("Approval result:", approvalResult);
    
    if (!approvalResult.success) {
      console.log("Token approval failed");
      return;
    }
    
    console.log("Lending funds...");
    const result = await lendFunds({ amount, duration: 2592000 }, account);
    console.log("Lending result:", result);
  };

  const handleBorrowing = async () => {
    if (!account) {
      console.log("No active account");
      return;
    }
    const result = await borrowFunds({ amount: 100, duration: 2592000 }, account);
    console.log(result);
  };

  const handleCollateral = async () => {
    if (!account) {
      console.log("No active account");
      return;
    }
    
    // First approve token spending for collateral
    const tokenAddress = "0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9"; // PYUSD on Sepolia
    const amount = 100;
    
    console.log("Approving token...");
    const approvalResult = await approveToken({ tokenAddress, amount }, account);
    console.log("Approval result:", approvalResult);
    
    if (!approvalResult.success) {
      console.log("Token approval failed");
      return;
    }
    
    console.log("Depositing collateral...");
    const result = await collateral({ amount }, account);
    console.log("Collateral result:", result);
  };

  return (
    <div className="max-w-screen h-screen flex justify-center">
      <div className="w-full h-full py-8 px-16 flex flex-col">
        {/* Navbar */}
        <Navbar />

        <div className="w-full flex-1 grid grid-cols-6 gap-10">
          {/* main content with scroll */}

          <div className="col-span-4">
            <ScrollArea className="rounded-2xl h-[85vh] bg-background">
              {/* main content */}
              <TopCard 
                poolAmount={poolStatus?.liquidity as number} 
                borrowedAmount={100} 
                lentAmount={0} 
              />
              <div className="grid grid-cols-6 w-full h-full gap-4">
                <div className="flex-col mt-4 col-span-4 w-full h-full">
                  <DataTable
                    title="Lent Records"
                    columns={[
                      { key: "amount", label: "Amount" },
                      { key: "duration", label: "Duration", align: "center" },
                      {
                        key: "returns",
                        label: "Approx Returns",
                        align: "center",
                      },
                      { key: "createdAt", label: "Created At", align: "right" },
                    ]}
                    data={lendRecords?.length > 0 ? lendRecords.map(formatLendRecordForTable) : []}
                    isLoading={recordsLoading}
                    emptyMessage="No lending records found"
                  />

                  <div className="w-full mt-6">
                    <DataTable
                      title="Borrow Records"
                      columns={[
                        { key: "amount", label: "Amount" },
                        { key: "duration", label: "Duration", align: "center" },
                        {
                          key: "returns",
                          label: "Locked Collateral",
                          align: "center",
                        },
                        {
                          key: "createdAt",
                          label: "Borrowed At",
                          align: "right",
                        },
                      ]}
                      data={borrowRecords?.length > 0 ? borrowRecords.map(formatBorrowRecordForTable) : []}
                      isLoading={recordsLoading}
                      emptyMessage="No borrow records found"
                    />
                  </div>
                </div>
                <div className="col-span-2 h-full w-full">
                  <div className="flex flex-col bg-card w-full aspect-[5/6] rounded-4xl justify-center items-center mt-4">
                    <div>
                      <button onClick={handleLending}>LendFunds</button>
                      <button onClick={handleBorrowing}>BorrowFunds</button>
                      <button onClick={handleCollateral}>Collateral</button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* fixed ai sidebar */}
          <ChatArea />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
