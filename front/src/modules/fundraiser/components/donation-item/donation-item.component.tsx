import React from "react";
import { Address, formatUnits } from "viem";
import { useShortenString } from "../../../../common/hooks";
import { container, topContainer } from "./donation-item.styles";

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

  return (
    <div css={container}>
      <div css={topContainer}>
        <h3>{shortAddress}</h3>
        <h3>{formatUnits(amount, 18)}</h3>
      </div>
      <p>{comment}</p>
    </div>
  );
};
