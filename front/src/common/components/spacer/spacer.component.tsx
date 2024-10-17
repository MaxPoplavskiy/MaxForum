import React from "react";
import { spacer } from "./spaces.styles";
import { SerializedStyles, useTheme } from "@emotion/react";

type Properties = {
  className?: SerializedStyles
}
export const Spacer: React.FC<Properties> = ({className}) => {
  const theme = useTheme()

  return <hr css={[spacer(theme), className]} />
}