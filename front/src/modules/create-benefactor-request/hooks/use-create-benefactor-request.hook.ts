import { useCallback, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { AdministrationAbi } from "../../../common/abi";
import { BenefactorRequest } from "../../../common/types";
import { BenefactorRequestArray, benefactorRequestToObject } from "../../../common/utils/transaction-read-array-to-object.utils";

type Return = {
  request: BenefactorRequest | null;
  sendRequest: (comment: string) => void;
};

const { VITE_ADMINISTRATOR_CONTRACT } = import.meta.env;

export const useCreateBenefactorRequest = (): Return => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const { data: benefactorRequest, refetch: refetchRequest } = useReadContract({
    abi: AdministrationAbi,
    functionName: "isBenefactorRequestSent",
    address: VITE_ADMINISTRATOR_CONTRACT,
    args: [address],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetchRequest();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetchRequest]);

  const sendRequest = useCallback(
    async (comment: string) => {
      if (!address) return;
      await writeContractAsync({
        abi: AdministrationAbi,
        address: VITE_ADMINISTRATOR_CONTRACT,
        functionName: "createBenefactorRequest",
        args: [comment],
      });
    },
    [address, writeContractAsync]
  );

  return {
    request: benefactorRequestToObject(benefactorRequest as BenefactorRequestArray),
    sendRequest,
  };
};
