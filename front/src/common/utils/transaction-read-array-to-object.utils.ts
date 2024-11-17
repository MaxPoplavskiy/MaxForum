import { Address } from "viem";
import { BenefactorRequest, BenefactorRequestStatus } from "../types";

export type BenefactorRequestArray = [
  string,
  string,
  BenefactorRequestStatus,
  Address
];
export const benefactorRequestToObject = (
  array: BenefactorRequestArray
): BenefactorRequest | null => {
  if (!Array.isArray(array)) return null;
  return {
    comment: array[0],
    declineReason: array[1],
    status: array[2],
    sender: array[3],
  };
};
