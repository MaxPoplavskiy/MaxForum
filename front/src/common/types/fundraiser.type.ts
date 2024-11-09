import { Address } from "viem"

export type Fundraiser = {
  title: string,
  description: string,
  goal: number,
  duration: number
}

export type ExtendedFundraiser = Omit<Fundraiser, 'duration' | 'goal'> & {
  address: Address,
  image: string,
  beneficiary: Address
  createdAt: Date
  deadline: Date
  goal: BigInt
  totalDonations: BigInt
  balance: BigInt
}