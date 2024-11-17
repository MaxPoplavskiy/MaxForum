import { useTheme as useGlobalTheme } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import { Button, Spacer, WalletOptions } from "../../common/components";
import { RouterKey } from "../../common/constants";
import {
  useAdministrationStatusHook,
  useShortenString,
} from "../../common/hooks";
import { UserStatus, UserStatusToString } from "../../common/types";
import { ButtonType } from "../../common/types/button.type";
import { useTheme } from "../../store/theme.store";
import {
  accountInfoContainer,
  buttonContainer,
  container,
  spacer,
} from "./account.styles";

export const Account: React.FC = () => {
  const { toggleTheme } = useTheme();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { userStatus, isAdmin, benefactorRequestsAmount } =
    useAdministrationStatusHook();
  const navigate = useNavigate();

  const shortAddress = useShortenString(address);

  const theme = useGlobalTheme();
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
          <div css={accountInfoContainer(theme)}>
            <h5>Address: {shortAddress}</h5>
            <h5>Status: {UserStatusToString[userStatus]}</h5>
            {isAdmin && (
              <>
                <h5>Admin privileges are enabled</h5>
                <Button
                  text="Account moderation"
                  onClick={() => navigate(RouterKey.ACCOUNT_MODERATION)}
                />
              </>
            )}
            {userStatus === UserStatus.ACTIVE && !isAdmin && (
              <Button
                text="Become Benefactor"
                onClick={() => navigate(RouterKey.BENEFACTOR_REQUEST)}
              />
            )}
            {isAdmin && benefactorRequestsAmount > 0 && (
              <Button
                text="Moderate Benefactor Requests"
                onClick={() => navigate(RouterKey.MODERATE_BENEFACTOR_REQUEST)}
              />
            )}
            <Button text="Logout" onClick={disconnect} />
          </div>
        ) : (
          <WalletOptions />
        )}
      </div>
    </div>
  );
};
