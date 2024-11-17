import { useTheme } from "@emotion/react";
import { textarea } from "./textarea.styles";

type Properties = React.InputHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<Properties> = ({ ...rest }) => {
  const theme = useTheme();
  return <textarea css={textarea(theme)} {...rest} />;
};
