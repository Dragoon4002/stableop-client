import GridInfoCard from "@/components/grid-info-card";
import Navbar from "@/components/navbar";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { client } from "@/lib/thirdweb-client";
import React from "react";
import { ConnectButton } from "thirdweb/react";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen p-6">
      {/* Navbar */}
      {/* <Navbar /> */}
      <div>
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={70} className="h-[95vh]">
            {/* Main Dashboard Area */}
            <ScrollArea className="mr-2 p-6 bg-primary-foreground rounded-xl h-full">
              <div className="w-full flex justify-center">
                <div className="max-w-7xl w-full space-y-6">
                  <Navbar />
                  {/* grid cards */}
                  <div className="grid grid-cols-3 w-full gap-6">
                    <GridInfoCard
                      imageNum={1}
                      title="Lended Balance"
                      value="$ 500,000"
                    />
                    <GridInfoCard
                      imageNum={1}
                      title="Lended Balance"
                      value="$ 500,000"
                    />
                    <GridInfoCard
                      imageNum={1}
                      title="Lended Balance"
                      value="$ 500,000"
                    />
                  </div>
                  {/*  */}
                </div>
              </div>
            </ScrollArea>
          </ResizablePanel>
          <ResizablePanel defaultSize={30} className="h-[95vh]">
            {/* Chat Area */}
            <div className="ml-2 p-4 bg-primary-foreground rounded-xl h-full">
              <div className=""></div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Dashboard;
