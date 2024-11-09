import { SerializedStyles, useTheme } from "@emotion/react";
import React from "react";
import { rounded, spacer, spacerThick, verticalSpacer } from "./spaces.styles";

type Properties = {
  className?: SerializedStyles;
  isThick?: boolean;
  isVertical?: boolean;
  isRounded?: boolean;
};
export const Spacer: React.FC<Properties> = ({
  className,
  isThick = false,
  isVertical = false,
  isRounded = false,
}) => {
  const theme = useTheme();

  return <hr css={[isVertical ? verticalSpacer(theme) : spacer(theme), className, isThick && spacerThick, isRounded && rounded]} />;
};
