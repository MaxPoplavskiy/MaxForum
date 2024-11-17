import React, { ChangeEvent, useState } from "react";
import { Button, Input, TextArea } from "../../common/components";
import { ButtonType } from "../../common/types/button.type";
import {
  buttonsContainer,
  container,
  content,
  textArea,
  title,
} from "./account-moderation.styles";
import { useModerateAccount } from "./hooks/use-moderate-account.hook";
import { useTheme } from "@emotion/react";

export const AccountModeration: React.FC = () => {
  const [address, setAddress] = useState("");

  const { block, unblock } = useModerateAccount();

  function addressChange(event: ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
  }

  const theme = useTheme()

  return (
    <div css={container}>
      <h1 css={title(theme)}>Account moderation</h1>
      <div css={content}>
        <Input placeholder="address" onChange={addressChange} />
        <TextArea css={textArea} placeholder="Block reason" />
        <div css={buttonsContainer}>
          <Button
            onClick={() => unblock(address)}
            type={ButtonType.APPROVE}
            text="Unblock/Remove Benefactor"
          />
          <Button
            onClick={() => {
              block(address);
            }}
            type={ButtonType.DECLINE}
            text="Block"
          />
        </div>
      </div>
    </div>
  );
};
