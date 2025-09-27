"use client";

import { client } from "@/lib/thirdweb-client";
import React from "react";
import { arbitrumSepolia, sepolia } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";

const items = [{ name: "Dashboard" }, { name: "Earn" }, { name: "Explore" }];

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center mb-8">
      <div className="space-x-4 flex items-center">
        <p className="text-2xl">StableOP</p>
        <div className="flex space-x-2 items-center p-2 rounded-full bg-card">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-2 px-4 rounded-full duration-500 cursor-pointer hover:bg-primary"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <ConnectButton
        connectButton={{
          className: "bg-primary",
          label: "Connect",
          style: {
            accentColor: "purple",
            color: "white",
            borderRadius: 200,
            backgroundColor: "#6741B9",
          },
        }}
        client={client}
        chains={[sepolia, arbitrumSepolia]}
      />
    </div>
  );
};

export default Navbar;
