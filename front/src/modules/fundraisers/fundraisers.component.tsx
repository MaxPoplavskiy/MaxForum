import { useTheme } from "@emotion/react";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { Spacer } from "../../common/components";
import { FundraiserCard } from "./component/card/fundraiser-card.component";
import { container, fundraisersContainer, title } from "./fundraisers.styles";
import { useReadFundraisers } from "./hooks/use-read-fundraisers.hook";

type Properties = {
  type?: "All" | "My";
};
export const Fundraisers: React.FC<Properties> = ({ type = "All" }) => {
  const isMineType = useMemo(() => {
    return type === "My";
  }, [type]);

  const { address } = useAccount();
  const { fundraisers } = useReadFundraisers(isMineType ? address : undefined);

  const theme = useTheme();

  return (
    <div css={container}>
      <h1 css={title(theme)}>
        {isMineType ? "My Fundraisers" : "Fundraisers"}
        <Spacer />
      </h1>
      <div css={fundraisersContainer}>
        {fundraisers.map((item) => (
          <FundraiserCard
            key={item.address}
            title={item.title}
            description={item.description}
            image={item.image}
            address={item.address}
            goal={item.goal}
            deadline={item.deadline}
          />
        ))}
      </div>
    </div>
  );
};
