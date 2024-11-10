import { useTheme } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";
import { Spacer } from "../../../../common/components";
import { RouterKey } from "../../../../common/constants";
import {
  container,
  descriptionStyles,
  imageContainer,
  imageStyles,
  lowerBody,
  moreContainer,
  moreLink,
  statusText,
  titleContainer,
  titleSpacer,
  titleStyles,
  upperBody,
} from "./fundraiser-card.styles";

type Properties = {
  title: string;
  description: string;
  image: string;
  goal: bigint;
  status: string;
  address: string;
  deadline: Date
};

export const FundraiserCard: React.FC<Properties> = ({
  title,
  description,
  image,
  address,
  goal,
  deadline,
  status
}) => {
  const theme = useTheme();

  return (
    <div css={container(theme)}>
      <div css={upperBody(theme)}>
        {image ? (
          <div css={imageContainer}>
            <img src={image} alt="fundraiser image" css={imageStyles(theme)} />
          </div>
        ) : (
          ""
        )}
        <div css={titleContainer}>
          <h2 css={titleStyles(theme)}>{title}</h2>
          <Spacer className={titleSpacer} />
        </div>
      </div>
      <div>
        <p css={descriptionStyles(theme)}>{description}</p>
        <p css={descriptionStyles(theme)}>Goal: {goal.toString()}</p>
        <p css={descriptionStyles(theme)}>Deadline: {deadline.toLocaleDateString()}</p>
        <p css={descriptionStyles(theme)}>Status: <span css={statusText(status)}>{status}</span></p>
      </div>
      <div css={lowerBody}>
        <div></div>
        <div css={moreContainer}>
          <Link
            to={`${RouterKey.FUNDRAISING.INDEX}/${address}`}
            css={moreLink(theme)}
          >
            More
          </Link>
          <Spacer />
        </div>
      </div>
    </div>
  );
};
