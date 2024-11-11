import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { AdministrationAbi } from "../../../common/abi";

type Return = {
  block: (address: string) => void;
  unblock: (address: string) => void;
};

const { VITE_ADMINISTRATOR_CONTRACT } = import.meta.env;

export const useModerateAccount = (): Return => {
  const { writeContractAsync } = useWriteContract();

  const block = useCallback(
    async (address: string) => {
      if (!address) return;
      await writeContractAsync({
        abi: AdministrationAbi,
        address: VITE_ADMINISTRATOR_CONTRACT,
        functionName: "blockUser",
        args: [address],
      });
    },
    [writeContractAsync]
  );

  const unblock = useCallback(
    async (address: string) => {
      if (!address) return;
      await writeContractAsync({
        abi: AdministrationAbi,
        address: VITE_ADMINISTRATOR_CONTRACT,
        functionName: "unblockUser",
        args: [address],
      });
    },
    [writeContractAsync]
  );

  return {
    block,
    unblock
  };
};
