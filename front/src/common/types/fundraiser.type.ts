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
  status: number,
  beneficiary: Address
  createdAt: Date
  deadline: Date
  goal: bigint
  totalDonations: bigint
  balance: bigint
  declineReason: string
}