import React from "react";
import { useConnect } from "wagmi";
import { connectorToIcon } from "../../constants/connector-to-icon.constant";
import { ButtonType } from "../../types/button.type";
import { Button } from "../button";

export const WalletOptions: React.FC = () => {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <React.Fragment key={connector.name}>
      <Button
        leftIcon={connectorToIcon[connector.name]}
        type={ButtonType.TRANSPARENT}
        text={connector.name}
        key={connector.uid}
        onClick={() => connect({ connector })}
      />
    </React.Fragment>
  ));
};
