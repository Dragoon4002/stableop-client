import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userAddress } = await request.json();

    if (!userAddress) {
      return NextResponse.json({ error: "User address is required" }, { status: 400 });
    }

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
              "function view_records(address user) view returns ((uint256 amount, uint256 createdAt, uint256 duration, uint256 approxReturns, bool active)[] lends, (uint256 amount, uint256 borrowedAt, uint256 duration, uint256 repayDate, uint256 lockedCollateral, bool active)[] borrows)",
            params: [userAddress],
          },
        ],
        chainId: 11155111,
      }),
    });

    const data = await response.json();
    
    if (data.result && Array.isArray(data.result) && data.result[0]) {
      const resultData = data.result[0];
      
      if (resultData.success && Array.isArray(resultData.data)) {
        return NextResponse.json({
          success: true,
          data: resultData.data
        });
      }
    }
    
    return NextResponse.json({ error: "No data found", rawData: data }, { status: 404 });
  } catch (error) {
    console.error("Error fetching user records:", error);
    return NextResponse.json({ error: "Failed to fetch user records" }, { status: 500 });
  }
}