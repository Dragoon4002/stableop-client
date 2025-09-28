import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch("https://api.thirdweb.com/v1/contracts/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": process.env.SECRET_KEY as string,
      },
      body: JSON.stringify({
        calls: [
          {
            contractAddress: "0xA0E197abd92035C0117CC2926CEB7485f04D7c3d",
            method:
              "function getPoolStatus() view returns (uint256 liquidity, uint256 borrowed, uint256 utilizationRate)",
            params: [],
          },
        ],
        chainId: 11155111,
      }),
    });

    const data = await response.json();
    
    if (data.result && Array.isArray(data.result) && data.result[0]) {
      const resultData = data.result[0];
      
      if (resultData.success && Array.isArray(resultData.data) && resultData.data.length >= 3) {
        const [liquidity, borrowed, utilizationRate] = resultData.data;
        return NextResponse.json({
          liquidity: Number(liquidity),
          borrowed: Number(borrowed),
          utilizationRate: Number(utilizationRate),
        });
      }
    }

    return NextResponse.json({ error: "No data found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching pool status:", error);
    return NextResponse.json({ error: "Failed to fetch pool status" }, { status: 500 });
  }
}