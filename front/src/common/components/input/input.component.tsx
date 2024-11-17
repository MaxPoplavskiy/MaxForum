import { useTheme } from "@emotion/react";
import { input } from "./input.styles";

type Properties = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Input: React.FC<Properties> = ({ ...rest }) => {
  const theme = useTheme();
  return <input css={input(theme)} {...rest} />;
};
