export const borrowRequest = async ({
  address,
  amount,
}: {
  address: string;
  amount: number;
}) => {
  return `Borrowed amount ${amount} at ${address}`;
};
