import React from "react";
import { spacer, spacerThick } from "./spaces.styles";
import { SerializedStyles, useTheme } from "@emotion/react";

type Properties = {
  className?: SerializedStyles
  isThick?: boolean
}
export const Spacer: React.FC<Properties> = ({className, isThick = false}) => {
  const theme = useTheme()

  return <hr css={[spacer(theme), className, isThick && spacerThick]} />
}