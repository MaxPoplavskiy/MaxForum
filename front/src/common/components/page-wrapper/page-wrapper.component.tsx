import React from "react";
import { container } from "./page-wrapper.styles";
import { useTheme } from "@emotion/react";

type Properties = {
  children: JSX.Element | JSX.Element[];
};

export const PageWrapper: React.FC<Properties> = ({ children }) => {
  const theme = useTheme()

  return <div css={container(theme)}>{children}</div>;
};
