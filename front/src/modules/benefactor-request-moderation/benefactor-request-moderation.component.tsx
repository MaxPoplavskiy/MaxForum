import React, { ChangeEvent, useState } from "react";
import { Button, TextArea } from "../../common/components";
import { BenefactorRequestStatusValueToString } from "../../common/types";
import { ButtonType } from "../../common/types/button.type";
import {
  buttonsContainer,
  container,
  content,
  requestInfo,
} from "./benefactor-request-moderation.styles";
import { useModerateBenefactorRequest } from "./hooks/use-moderate-benefactor-request.hook";
import { useTheme } from "@emotion/react";

export const BenefactorRequestModeration: React.FC = () => {
  const [address, setAddress] = useState("");

  const { request, approve, decline } = useModerateBenefactorRequest();

  function addressChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setAddress(event.target.value);
  }

  const theme = useTheme()

  return (
    <div css={container}>
      <div css={content}>
        <div css={requestInfo(theme)}>
          <h1>Request info:</h1>
          <h3>
            Status: {BenefactorRequestStatusValueToString[request?.status ?? 0]}
          </h3>
          <h3>Sender address: {request?.status}</h3>
          <h3>Comment: {request?.comment}</h3>
          {request?.declineReason && (
            <h3>Decline reason: {request.declineReason}</h3>
          )}
        </div>
        <div css={buttonsContainer}>
          <Button onClick={approve} type={ButtonType.APPROVE} text="Approve" />
          <Button
            onClick={() => {
              decline(address);
            }}
            type={ButtonType.DECLINE}
            text="Decline"
          />
        </div>
        <TextArea placeholder="Enter decline reason" onChange={addressChange} />
      </div>
    </div>
  );
};
