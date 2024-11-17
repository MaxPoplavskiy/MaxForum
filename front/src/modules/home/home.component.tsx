import { useTheme } from "@emotion/react";
import React from "react";
import { Spacer } from "../../common/components";
import { container, spacer, text, title } from "./home.styles";

export const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <div css={container}>
      <h1 css={title(theme)}>MAXFUDRAISER</h1>
      <Spacer className={spacer} />
      <p css={text(theme)}>
        MaxFundraiser is an innovative platform designed to transform charitable
        fundraising through the integration of Web3 and blockchain technology.
        This website allows individuals and organizations to raise funds for
        various causes while enabling donors to contribute securely using
        cryptocurrencies. With blockchain's transparent and immutable ledger,
        every donation is tracked, fostering trust and accountability between
        fundraisers and supporters. MaxFundraiser provides user-friendly tools
        for creating personalized fundraising campaigns, sharing them across
        social media, and accessing real-time analytics to maximize outreach. By
        harnessing the power of Web3, MaxFundraiser ensures that every
        contribution has a meaningful impact, making it the go-to platform for
        modern philanthropy.
      </p>
    </div>
  );
};
