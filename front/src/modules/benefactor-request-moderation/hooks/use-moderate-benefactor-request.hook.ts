import { useCallback, useEffect } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { AdministrationAbi } from "../../../common/abi";
import { BenefactorRequest } from "../../../common/types";

type Return = {
  approve: () => void;
  decline: (reason: string) => void;
  request: BenefactorRequest | null;
};

const { VITE_ADMINISTRATOR_CONTRACT } = import.meta.env;

export const useModerateBenefactorRequest = (): Return => {
  const { writeContractAsync } = useWriteContract();

  const { data: benefactorRequest, refetch: refetchRequest } = useReadContract({
    abi: AdministrationAbi,
    functionName: "getBenefactorRequest",
    address: VITE_ADMINISTRATOR_CONTRACT,
  });

  const decline = useCallback(
    async (reason: string) => {
      if (!reason) return;
      await writeContractAsync({
        abi: AdministrationAbi,
        address: VITE_ADMINISTRATOR_CONTRACT,
        functionName: "declineBenefactorToLast",
        args: [reason],
      });
    },
    [writeContractAsync]
  );

  const approve = useCallback(async () => {
    await writeContractAsync({
      abi: AdministrationAbi,
      address: VITE_ADMINISTRATOR_CONTRACT,
      functionName: "giveBenefactorToLast",
    });
  }, [writeContractAsync]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchRequest();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetchRequest]);

  return {
    decline,
    approve,
    request: (benefactorRequest as BenefactorRequest) ?? null,
  };
};
