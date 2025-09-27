import ChatArea from "@/components/chat-area";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import  PyusdCard from "@/components/main-components/pyusdCard";
import DataTable from "@/components/main-components/data-table";

const Dashboard = () => {
  return (
    <div className="max-w-screen h-screen flex justify-center">
      <div className="w-full h-full py-8 px-16 flex flex-col">
        {/* Navbar */}
        <Navbar />

        <div className="w-full flex-1 grid grid-cols-6 gap-10">
          {/* main content with scroll */}

          <div className="col-span-4">
            <ScrollArea
              className="rounded-2xl h-[85vh] flex-col"
            >
              {/* main content */}
              <PyusdCard poolAmount={165.32} borrowedAmount={7} lentAmount={3} />
              <div className="grid grid-cols-6 w-full h-full gap-4">
                <div className="flex-col mt-4 col-span-4 w-full h-full">
                  
                  <DataTable
                    title="Lent Records"
                    columns={[
                      { key: "amount", label: "Amount" },
                      { key: "duration", label: "Duration", align: "center" },
                      { key: "returns", label: "Approx Returns", align: "center" },
                      { key: "createdAt", label: "Created At", align: "right" }
                    ]}
                    data={[
                      { amount: "INV001", duration: "Paid", returns: "Credit Card", createdAt: "$250.00" },
                      { amount: "INV002", duration: "Pending", returns: "Bank Transfer", createdAt: "$150.00" }
                    ]}
                    isLoading={false}
                    emptyMessage="No lending records found"
                  />

                  <div className="w-full mt-6">
                  <DataTable
                    title="Borrow Records"
                    columns={[
                      { key: "amount", label: "Amount" },
                      { key: "duration", label: "Duration", align: "center" },
                      { key: "returns", label: "Approx Returns", align: "center" },
                      { key: "createdAt", label: "Created At", align: "right" }
                    ]}
                    data={[
                      { amount: "INV001", duration: "Paid", returns: "Credit Card", createdAt: "$250.00" },
                      { amount: "INV002", duration: "Pending", returns: "Bank Transfer", createdAt: "$150.00" }
                    ]}
                    isLoading={false}
                    emptyMessage="No lending records found"
                  />

                  </div>
                </div>
                <div className="col-span-2 h-full w-full" >
                <div className="flex flex-col bg-card w-full aspect-[5/6] rounded-4xl justify-center items-center mt-4">Hello World</div>

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
