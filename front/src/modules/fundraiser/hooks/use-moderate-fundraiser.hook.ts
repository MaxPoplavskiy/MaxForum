import { useCallback } from "react";
import { Address } from "viem";
import { useWriteContract } from "wagmi";
import { FundraiserAbi } from "../../../common/abi";

type Return = {
  approve: () => void;
  decline: (reason: string) => void;
};

export const useModerateFundraiser = (address: Address | undefined): Return => {
  const { writeContractAsync } = useWriteContract();

  const approve = useCallback(async () => {
    if (!address) return;
    await writeContractAsync({
      abi: FundraiserAbi,
      address,
      functionName: "approve",
    });
  }, [address, writeContractAsync]);

  const decline = useCallback(
    async (reason: string) => {
      if (!address) return;
      await writeContractAsync({
        abi: FundraiserAbi,
        address,
        functionName: "decline",
        args: [reason],
      });
    },
    [address, writeContractAsync]
  );

  return {
    approve,
    decline,
  };
};
