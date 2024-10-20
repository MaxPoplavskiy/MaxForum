import { useWriteContract } from "wagmi";
import { FundraiserFactoryAbi } from "../../../common/abi";
import { CreateFundraisingDTO } from "../types/create-fundraising-dto.type";

const { VITE_FUNDRAISER_FACTORY } = import.meta.env;

type Return = {
  createFundraising: (data: CreateFundraisingDTO) => Promise<void>;
};

export const useCreateCreateFundraising = (): Return => {
  const { writeContractAsync } = useWriteContract();

  const createFundraising = async (data: CreateFundraisingDTO) => {
    await writeContractAsync({
      abi: FundraiserFactoryAbi,
      address: VITE_FUNDRAISER_FACTORY,
      functionName: "createFundraiser",
      args: [data.address, data.goal, data.duration, data.title, data.description],
    });
  };

  return {
    createFundraising,
  };
};
