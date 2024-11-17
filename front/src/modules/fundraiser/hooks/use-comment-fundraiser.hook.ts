import { useCallback, useEffect } from "react";
import { Address } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { FundraiserAbi } from "../../../common/abi";
import { Comment } from "../../../common/types/comment.type";

type Return = {
  comment: (comment: string) => void;
  comments: Comment[];
};

export const useCommentFundraiser = (address: Address | undefined): Return => {
  const { writeContractAsync } = useWriteContract();

  const comment = useCallback(
    async (comment: string) => {
      if (!address) return;
      await writeContractAsync({
        abi: FundraiserAbi,
        address,
        functionName: "comment",
        args: [comment],
      });
    },
    [address, writeContractAsync]
  );

  const { data: comments, refetch: refetchComments } = useReadContract({
    abi: FundraiserAbi,
    address,
    functionName: "getAllComments",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetchComments();
    }, 10000);
    return () => clearInterval(interval);
  }, [refetchComments]);

  return {
    comment,
    comments: comments as Comment[],
  };
};
