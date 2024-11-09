import { useEffect, useState } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";
import { FundraiserAbi } from "../../../common/abi";
import { ExtendedFundraiser } from "../../../common/types";
import { FundraiserContractDetailed } from "../../../common/types/fundraiser-contract-detailed.type";
import { pinataService } from "../../../services/pinata/pinata.service";

type Return = {
  fundraiser: ExtendedFundraiser | null;
};

export const useReadFundraiser = (address: Address | undefined): Return => {
  const [fundraiser, setFundraiser] = useState<ExtendedFundraiser>();
  const { data } = useReadContract({
    abi: FundraiserAbi,
    functionName: "getDetails",
    address,
  });

  useEffect(() => {
    const fetchFundraiser = async () => {
      if(!address) return
      const [
        beneficiary,
        goal,
        deadline,
        createdAt,
        totalDonations,
        balance,
        title,
        description,
        hash,
      ] = data as FundraiserContractDetailed;

      const image = await pinataService.hashToImageLink(hash);

      setFundraiser({
        beneficiary,
        goal: goal,
        deadline: new Date(Number(deadline) * 1000),
        totalDonations: totalDonations,
        balance: balance,
        createdAt: new Date(Number(createdAt) * 1000),
        title,
        description,
        image,
        address,
      });
    };

    fetchFundraiser();
  }, [data, address]);

  return {
    fundraiser: (fundraiser as ExtendedFundraiser) ?? null,
  };
};
