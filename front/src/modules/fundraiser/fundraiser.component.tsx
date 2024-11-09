import { useTheme } from "@emotion/react";
import React from "react";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import { Spacer } from "../../common/components";
import {
  bottomContainer,
  bottomSpacer,
  container,
  description,
  fundraiserGrid,
  image,
  imageContainer,
  infoText,
  text,
  title,
} from "./fundraiser.styles";
import { useReadFundraiser } from "./hooks/use-read-fundraiser.hook";

export const Fundraiser: React.FC = () => {
  const { fundraiserAddress } = useParams();
  const { fundraiser } = useReadFundraiser(fundraiserAddress as Address);
  const theme = useTheme();

  return (
    <div css={container}>
      <div css={fundraiserGrid}>
        {fundraiser?.image && (
          <>
            <div css={imageContainer}>
              <img src={fundraiser.image} alt="fundraiser" css={image(theme)} />
            </div>
            <div>
              <Spacer isVertical={true} isThick={true} isRounded={true} />
            </div>
          </>
        )}

        <div>
          <h1 css={title(theme)}>{fundraiser?.title}</h1>
          <p css={text(theme)}>Deadline: {fundraiser?.deadline.toLocaleDateString()}</p>
          <p css={text(theme)}>Goal: {fundraiser?.goal.toString()} Tokens</p>
        </div>

        <div css={description(theme)}>
          <p>{fundraiser?.description}</p>
        </div>

        <div css={bottomContainer}>
          <h3 css={infoText(theme)}>{fundraiser?.beneficiary}</h3>
          <h3 css={infoText(theme)}>
            {fundraiser?.createdAt.toLocaleDateString()}
          </h3>
        </div>

        <Spacer className={bottomSpacer} />
      </div>
    </div>
  );
};
