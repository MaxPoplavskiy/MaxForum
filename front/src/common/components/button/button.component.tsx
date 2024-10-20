import { useTheme } from "@emotion/react";
import React from "react";
import { button, transparentButton } from "./button.styles";

type Properties = {
  isTransparent?: boolean;
  text: string
  onClick?: () => void
  leftIcon?: JSX.Element
};
export const Button: React.FC<Properties> = ({ isTransparent = false, text, onClick, leftIcon }) => {
  const theme = useTheme();

  return (  
    <button onClick={onClick} css={[button(theme), isTransparent && transparentButton(theme)]}>
      {leftIcon ?? <div></div>}
      {text}
    </button>
  );
};
