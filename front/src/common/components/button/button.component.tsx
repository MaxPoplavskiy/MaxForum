import { useTheme } from "@emotion/react";
import React, { useMemo } from "react";
import { ButtonType } from "../../types/buttom.type";
import {
  approveButton,
  button,
  declineButton,
  transparentButton,
} from "./button.styles";

type Properties = {
  type?: ButtonType;
  text: string;
  onClick?: () => void;
  leftIcon?: JSX.Element;
};
export const Button: React.FC<Properties> = ({
  type = ButtonType.FILLED,
  text,
  onClick,
  leftIcon,
}) => {
  const theme = useTheme();

  const typeStyles = useMemo(() => {
    if (type === ButtonType.TRANSPARENT) return transparentButton(theme);
    if (type === ButtonType.APPROVE) return approveButton(theme);
    if (type === ButtonType.DECLINE) return declineButton(theme)
  }, [type, theme]);

  return (
    <button onClick={onClick} css={[button(theme), typeStyles]}>
      {leftIcon ?? <div></div>}
      {text}
    </button>
  );
};
