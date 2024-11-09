import { useWriteContract } from "wagmi";
import { FundraiserFactoryAbi } from "../../../common/abi";
import { CreateFundraisingDTO } from "../types/create-fundraising-dto.type";
import { pinataService } from "../../../services/pinata/pinata.service";
import { useNavigate } from "react-router-dom";
import { RouterKey } from "../../../common/constants";

const { VITE_FUNDRAISER_FACTORY } = import.meta.env;

type Return = {
  createFundraising: (data: CreateFundraisingDTO) => Promise<void>;
};

export const useCreateCreateFundraising = (): Return => {
  const navigate = useNavigate()
  const { writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: () => {
        navigate(`${RouterKey.FUNDRAISING.INDEX}/${RouterKey.FUNDRAISING.MY_FUNDRAISERS}`)
      }
    }
  });

  const createFundraising = async (data: CreateFundraisingDTO) => {
    const uri = await pinataService.uploadImage(data.file)
    
    await writeContractAsync({
      abi: FundraiserFactoryAbi,
      address: VITE_FUNDRAISER_FACTORY,
      functionName: "createFundraiser",
      args: [data.address, data.goal, data.duration, data.title, data.description, uri.hash],
    });
  };

  return {
    createFundraising,
  };
};
