"use client";

import { client } from "@/lib/thirdweb-client";
import React from "react";
import { arbitrumSepolia, sepolia } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <p className="text-2xl font-semibold">StableOp</p>
      <ConnectButton client={client} chains={[sepolia, arbitrumSepolia]} />
    </div>
  );
};

export default Navbar;
