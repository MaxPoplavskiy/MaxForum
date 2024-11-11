import React, { ChangeEvent, useState } from "react";
import { Button, Input } from "../../common/components";
import { ButtonType } from "../../common/types/button.type";
import {
  buttonsContainer,
  container,
  content,
} from "./account-moderation.styles";
import { useModerateAccount } from "./hooks/use-moderate-account.hook";

export const AccountModeration: React.FC = () => {
  const [address, setAddress] = useState("");

  const { block, unblock } = useModerateAccount();

  function addressChange(event: ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
  }

  return (
    <div css={container}>
      <div css={content}>
        <Input onChange={addressChange} />
        <div css={buttonsContainer}>
          <Button
            onClick={() => unblock(address)}
            type={ButtonType.APPROVE}
            text="Unblock"
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
