import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Button, Spacer, WalletOptions } from "../../common/components";
import { useTheme } from "../../store/theme.store";
import { buttonContainer, container, spacer } from "./account.styles";

export const Account: React.FC = () => {
  const { toggleTheme } = useTheme();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div css={container}>
      <div css={buttonContainer}>
        <Button
          onClick={toggleTheme}
          isTransparent={true}
          text="Change theme"
        />
        <Spacer className={spacer} />
        {isConnected ? (
          <Button text="Logout" onClick={disconnect} />
        ) : (
          <WalletOptions />
        )}
      </div>
    </div>
  );
};
