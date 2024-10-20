import { Address } from "viem"

export type CreateFundraisingDTO = {
  title: string,
  description: string,
  address: Address,
  goal: number,
  duration: number
}