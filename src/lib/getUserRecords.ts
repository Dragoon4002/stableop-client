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

export async function getUserRecords(user: string): Promise<[LendRecord[], BorrowRecord[]]> {
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
          params: [user],
        },
      ],
      chainId: 11155111,
    }),
  });

  const data = await response.json();

  if (data.result && Array.isArray(data.result) && data.result[0]) {
    const resultData = data.result[0];
    console.log("ResultData:", resultData);
    if (resultData.success && Array.isArray(resultData.data) && resultData.data.length >= 2) {
      const [lends, borrows] = resultData.data;
      return [lends || [], borrows || []];
    }
  }

  return [[], []];
}

export function getTotalAmountLent(lends: LendRecord[]): number {
  return lends.reduce((total, lend) => {
    return total + Number(lend.amount);
  }, 0);
}

export function getTotalAmountBorrowed(borrows: BorrowRecord[]): number {
  return borrows.reduce((total, borrow) => {
    return total + Number(borrow.amount);
  }, 0);
}