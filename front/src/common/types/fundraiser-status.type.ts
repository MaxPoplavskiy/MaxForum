export enum FundraiserStatusFilterValue {
  ALL = "ALL",
  PENDING = "0",
  APPROVED = "1",
  DECLINED = "2",
}

export enum FundraiserStatusValue {
  PENDING,
  APPROVED,
  DECLINED,
}

export const FundraiserStatusValueToString: Record<number, string> = {
  0: "PENDING",
  1: "APPROVED",
  2: "DECLINED",
}

export const FundraiserStatusFilterOption = {
  ALL: {
    value: FundraiserStatusFilterValue.ALL,
    label: FundraiserStatusFilterValue.ALL,
  },
  PENDING: {
    value: FundraiserStatusFilterValue.PENDING,
    label: "PENDING",
  },
  APPROVED: {
    value: FundraiserStatusFilterValue.APPROVED,
    label: "APPROVED",
  },
  DECLINED: {
    value: FundraiserStatusFilterValue.DECLINED,
    label: "DECLINED",
  },
};

export type FundraiserStatusFilter = typeof FundraiserStatusFilterOption;
