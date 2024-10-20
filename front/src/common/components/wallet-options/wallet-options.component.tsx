import React from "react";
import { useConnect } from "wagmi";
import { Button } from "../button";
import { connectorToIcon } from "../../constants/connector-to-icon.constant";

export const WalletOptions: React.FC = () => {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <React.Fragment key={connector.name}>
      <Button
        leftIcon={connectorToIcon[connector.name]}
        isTransparent={true}
        text={connector.name}
        key={connector.uid}
        onClick={() => connect({ connector })}
      />
    </React.Fragment>
  ));
};
