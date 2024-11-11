import React from "react";
import { Address } from "viem";
import { useShortenString } from "../../../../common/hooks";
import { container, topContainer } from "./comment-item.styles";

type Properties = {
  comment: string;
  address: Address;
};

export const CommentItem: React.FC<Properties> = ({ comment, address }) => {
  const shortAddress = useShortenString(address);

  return (
    <div css={container}>
      <div css={topContainer}>
        <h3>{shortAddress}</h3>
      </div>
      <p>{comment}</p>
    </div>
  );
};
