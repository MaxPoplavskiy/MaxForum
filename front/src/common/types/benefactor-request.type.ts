import { Address } from "viem";

export enum BenefactorRequestStatus {
  PENDING,
  APPROVED,
  DECLINED,
}

export const BenefactorRequestStatusValueToString = {
  [BenefactorRequestStatus.PENDING]: "PENDING",
  [BenefactorRequestStatus.APPROVED]: "APPROVED",
  [BenefactorRequestStatus.DECLINED]: "DECLINED",
};

export type BenefactorRequest = {
  comment: string;
  declineReason: string;
  status: BenefactorRequestStatus;
  sender: Address;
};
