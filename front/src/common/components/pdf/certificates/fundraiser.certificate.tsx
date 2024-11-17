import { forwardRef } from "react";
import { FundraiserStatusValueToString } from "../../../types/fundraiser-status.type";
import { Spacer } from "../../spacer";
import {
  container,
  spacer,
  statusText,
  titleStyles,
} from "./fundraiser.styles";
import { formatUnits } from "viem";

type Properties = {
  isPreview: boolean;
  title: string;
  fundraiserAddress: string | undefined;
  beneficiarAddress: string | undefined;
  goal: bigint | undefined;
  totalDonations: bigint | undefined;
  deadline: Date | undefined;
  status: number | undefined;
};

export const FundraiserCertificate = forwardRef<HTMLDivElement, Properties>(
  (
    {
      title,
      isPreview,
      fundraiserAddress,
      beneficiarAddress,
      goal,
      deadline,
      totalDonations,
      status,
    },
    ref
  ) => {
    return (
      <div css={container(isPreview)} ref={ref}>
        <h1 css={titleStyles}>{title}</h1>
        <Spacer className={spacer} isThick={true} />
        <h2>Fundraiser address: {fundraiserAddress}</h2>
        <Spacer className={spacer} />
        <h2>Beneficiar address: {beneficiarAddress}</h2>
        <Spacer className={spacer} />
        <h2>
          Status:{" "}
          <span css={statusText(status ?? 0)}>
            {FundraiserStatusValueToString[status ?? 0]}
          </span>
        </h2>
        <Spacer className={spacer} />
        <h2>Goal: {goal?.toLocaleString()}</h2>
        <Spacer className={spacer} />
        <h2>Total donations: {formatUnits(totalDonations ?? BigInt(0), 18)}</h2>
        <Spacer className={spacer} />
        <h2>Deadline: {deadline?.toLocaleDateString()}</h2>
        <Spacer className={spacer} />
      </div>
    );
  }
);
