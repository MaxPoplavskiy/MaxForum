import { useCallback, useEffect } from "react";
import { Address, parseEther } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { FundraiserAbi } from "../../../common/abi";
import { Donation } from "../../../common/types/donation.type";

type Return = {
  donate: (amount: number, comment: string) => void;
  donations: Donation[];
};

export const useDonateFundraiser = (address: Address | undefined): Return => {
  const { writeContractAsync } = useWriteContract();

  const donate = useCallback(
    async (amount: number, comment: string) => {
      if (!address) return;
      await writeContractAsync({
        abi: FundraiserAbi,
        address,
        functionName: "donate",
        args: [comment],
        value: parseEther(amount.toString()),
      });
    },
    [address, writeContractAsync]
  );

  const { data: donations, refetch: refetchDonation } = useReadContract({
    abi: FundraiserAbi,
    address,
    functionName: "getAllDonations",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetchDonation();
    }, 10000);
    return () => clearInterval(interval);
  }, [refetchDonation]);

  return {
    donate,
    donations: donations as Donation[],
  };
};
