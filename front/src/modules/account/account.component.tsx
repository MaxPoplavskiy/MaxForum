import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Button, Spacer, WalletOptions } from "../../common/components";
import { useTheme } from "../../store/theme.store";
import { accountInfoContainer, buttonContainer, container, spacer } from "./account.styles";
import { ButtonType } from "../../common/types/buttom.type";
import { useAdministrationStatusHook, useShortenString } from "../../common/hooks";
import { UserStatusToString } from "../../common/types";

export const Account: React.FC = () => {
  const { toggleTheme } = useTheme();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { userStatus, isAdmin } = useAdministrationStatusHook()

  const shortAddress = useShortenString(address)
  return (
    <div css={container}>
      <div css={buttonContainer}>
        <Button
          onClick={toggleTheme}
          type={ButtonType.TRANSPARENT}
          text="Change theme"
        />
        <Spacer className={spacer} />
        {isConnected ? (
          <div css={accountInfoContainer}>
            <h5>Address: {shortAddress}</h5>
            <h5>Status: {UserStatusToString[userStatus]}</h5>
            {isAdmin && <h5>Admin privileges are enabled</h5>}
            <Button text="Logout" onClick={disconnect} />
          </div>
        ) : (
          <WalletOptions />
        )}
      </div>
    </div>
  );
};
