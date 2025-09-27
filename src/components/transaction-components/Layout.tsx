import React from "react";

const TransactionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen fixed z-50 bg-background/50 backdrop-blur-2xl top-0 right-0 flex items-center justify-center">
      {children}
    </div>
  );
};

export default TransactionLayout;
