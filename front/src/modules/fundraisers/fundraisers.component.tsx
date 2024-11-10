import { useTheme } from "@emotion/react";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { Spacer } from "../../common/components";
import { Dropdown } from "../../common/components/dropdown/dropdown.component";
import { useAdministrationStatusHook } from "../../common/hooks";
import {
  FundraiserStatusFilterOption,
  FundraiserStatusFilterValue,
  FundraiserStatusValueToString,
} from "../../common/types/fundraiser-status.type";
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

  const [statusFilter, setStatusFilter] = useState<FundraiserStatusFilterValue>(
    FundraiserStatusFilterValue.ALL
  );

  const { fundraisers } = useReadFundraisers(
    isMineType ? address : undefined,
    statusFilter
  );

  const theme = useTheme();
  const { isAdmin } = useAdministrationStatusHook();

  return (
    <div css={container}>
      <h1 css={title(theme)}>
        {isMineType ? "My Fundraisers" : "Fundraisers"}
        <Spacer />
      </h1>
      <div>
        {isAdmin && (
          <Dropdown<FundraiserStatusFilterValue>
            placeholder="Select status"
            onChange={setStatusFilter}
            values={[
              FundraiserStatusFilterOption.ALL,
              FundraiserStatusFilterOption.APPROVED,
              FundraiserStatusFilterOption.DECLINED,
              FundraiserStatusFilterOption.PENDING,
            ]}
          />
        )}
      </div>
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
            status={FundraiserStatusValueToString[item.status]}
          />
        ))}
      </div>
    </div>
  );
};