import { useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import { useReadContract, useReadContracts } from "wagmi";
import { FundraiserAbi, FundraiserFactoryAbi } from "../../../common/abi";
import { ExtendedFundraiser } from "../../../common/types";
import { FundraiserContractDetailed } from "../../../common/types/fundraiser-contract-detailed.type";
import { pinataService } from "../../../services/pinata/pinata.service";

const { VITE_FUNDRAISER_FACTORY } = import.meta.env;

type Return = {
  fundraisers: ExtendedFundraiser[];
};

const readFundraiser = (address: Address) => {
  return {
    abi: FundraiserAbi,
    functionName: "getDetails",
    address,
  };
};

export const useReadFundraisers = (
  filterAccount: string | undefined
): Return => {
  const [fundraisers, setFundraisers] = useState<ExtendedFundraiser[]>([]);
  const { data } = useReadContract({
    abi: FundraiserFactoryAbi,
    functionName: "getFundraisers",
    address: VITE_FUNDRAISER_FACTORY,
  });

  const { data: detailedData } = useReadContracts({
    contracts: ((data ?? []) as Address[]).map((item) => readFundraiser(item)),
  });

  useEffect(() => {
    if (!detailedData) return;

    const fetchFundraisers = async () => {
      const promises = detailedData.map(async (item, i) => {
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
        ] = Object.values(item.result as any) as FundraiserContractDetailed;

        const image = await pinataService.hashToImageLink(hash);
        
        return {
          beneficiary,
          goal: goal,
          deadline: new Date(Number(deadline) * 1000),
          createdAt: new Date(Number(createdAt) * 1000),
          totalDonations: totalDonations,
          balance: balance,
          title,
          description,
          image,
          address: (data as Address[])[i],
        };
      });

      const results = await Promise.allSettled(promises);
      const fulfilledResults = results
        .filter((result) => result.status === "fulfilled")
        .map(
          (result) =>
            (result as PromiseFulfilledResult<ExtendedFundraiser>).value
        );

      setFundraisers(fulfilledResults);
    };

    fetchFundraisers();
  }, [detailedData]);

  const filteredFundraisers = useMemo(() => {
    return filterAccount
      ? fundraisers.filter((item) => item.beneficiary === filterAccount)
      : fundraisers;
  }, [filterAccount, fundraisers]);

  return {
    fundraisers: (filteredFundraisers as ExtendedFundraiser[]) ?? [],
  };
};
