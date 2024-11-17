import { useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import { useReadContract, useReadContracts } from "wagmi";
import { FundraiserAbi, FundraiserFactoryAbi } from "../../../common/abi";
import { ExtendedFundraiser } from "../../../common/types";
import { FundraiserContractDetailed } from "../../../common/types/fundraiser-contract-detailed.type";
import { FundraiserStatusFilterValue } from "../../../common/types/fundraiser-status.type";
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
  filterAccount: string | undefined,
  filterStatus: FundraiserStatusFilterValue = FundraiserStatusFilterValue.ALL,
  filterName: string = ''
): Return => {
  const [fundraisers, setFundraisers] = useState<ExtendedFundraiser[]>([]);
  const { data, refetch } = useReadContract({
    abi: FundraiserFactoryAbi,
    functionName: "getFundraisers",
    address: VITE_FUNDRAISER_FACTORY,
  });

  const { data: detailedData, refetch: refetchMany } = useReadContracts({
    contracts: ((data ?? []) as Address[]).map((item) => readFundraiser(item)),
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      await refetch();
      await refetchMany();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetch, refetchMany, data]);

  useEffect(() => {
    if (!detailedData) return;
    const fetchFundraisers = async () => {
      const promises = detailedData.map(async (item, i) => {
        const [
          status,
          beneficiary,
          goal,
          deadline,
          createdAt,
          totalDonations,
          balance,
          title,
          description,
          hash,
        ] = Object.values(item.result as object) as FundraiserContractDetailed;

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
          status,
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
  }, [data, detailedData]);

  const filteredFundraisers = useMemo(() => {
    const accountFilter = filterAccount
      ? fundraisers.filter((item) => item.beneficiary === filterAccount)
      : fundraisers;

    const statusFilter = filterStatus !== FundraiserStatusFilterValue.ALL
      ? accountFilter.filter((item) => item.status === Number(filterStatus))
      : accountFilter;

    const nameFilter = filterName !== ''
    ? statusFilter.filter((item) => item.title.includes(filterName))
    : statusFilter;

    return nameFilter
  }, [filterName, filterAccount, fundraisers, filterStatus]);

  return {
    fundraisers: (filteredFundraisers as ExtendedFundraiser[]) ?? [],
  };
};
