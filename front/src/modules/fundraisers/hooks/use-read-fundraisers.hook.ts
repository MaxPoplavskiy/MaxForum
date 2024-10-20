import { useReadContract } from "wagmi"
import { Fundraiser } from "../../../common/types"
import { FundraiserFactoryAbi } from "../../../common/abi"

const { VITE_FUNDRAISER_FACTORY } = import.meta.env;

type Return = {
  fundraisers: Fundraiser[]
}

export const useReadFundraisers = (): Return => {
  const { data } = useReadContract({
    abi: FundraiserFactoryAbi,
    functionName: 'getFundraisers',
    address: VITE_FUNDRAISER_FACTORY,
  })


  console.log(data);
  
  return {
    fundraisers: data as Fundraiser[] ?? []
  }
}