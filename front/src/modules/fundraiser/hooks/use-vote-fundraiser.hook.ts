import { useCallback, useEffect } from "react";
import { Address } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { FundraiserAbi } from "../../../common/abi";

type Return = {
  upvoteCount: bigint;
  upvote: () => void;
  isVoted: boolean;
};

export const useVoteFundraiser = (address: Address | undefined): Return => {
  const { writeContractAsync } = useWriteContract();
  const { data: upvoteCount, refetch: refetchCount } = useReadContract({
    abi: FundraiserAbi,
    address,
    functionName: "upvoteCount",
  });
  const { data: isVoted, refetch: refetchIsVoted } = useReadContract({
    abi: FundraiserAbi,
    address,
    functionName: "upvoteCount",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetchCount();
      refetchIsVoted();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetchCount, refetchIsVoted]);

  const upvote = useCallback(async () => {
    if (!address) return;
    await writeContractAsync({
      abi: FundraiserAbi,
      address,
      functionName: "toggleUpvote",
    });
  }, [address, writeContractAsync]);

  return {
    upvoteCount: upvoteCount as bigint,
    upvote,
    isVoted: isVoted as boolean,
  };
};
