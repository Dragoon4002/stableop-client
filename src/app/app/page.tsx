import ChatArea from "@/components/chat-area";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const Dashboard = () => {
  return (
    <div className="max-w-screen h-screen flex justify-center">
      <div className="w-full h-full py-8 px-16 flex flex-col">
        {/* Navbar */}
        <Navbar />

        <div className="w-full flex-1 grid grid-cols-6 gap-10">
          {/* main content with scroll */}

          <div className="col-span-4">
            <ScrollArea className="rounded-2xl h-[85vh] bg-card">
              {/* main content */}
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
