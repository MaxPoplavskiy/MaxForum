import { Address } from "viem";

export type Donation = {
  amount: bigint;
  comment: string;
  sender: Address;
};
