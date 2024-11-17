import React from "react";
import { Address, formatUnits } from "viem";
import { useShortenString } from "../../../../common/hooks";
import { container, topContainer } from "./donation-item.styles";
import { useTheme } from "@emotion/react";

type Properties = {
  comment: string;
  address: Address;
  amount: bigint;
};

export const DonationItem: React.FC<Properties> = ({
  comment,
  address,
  amount,
}) => {
  const shortAddress = useShortenString(address);
  const theme = useTheme()
  return (
    <div css={container(theme)}>
      <div css={topContainer}>
        <h3>{shortAddress}</h3>
        <h3>{formatUnits(amount, 18)}</h3>
      </div>
      <p>{comment}</p>
    </div>
  );
};
