import { useTheme } from "@emotion/react";
import { input } from "./number-input.styles";
import { ChangeEvent } from "react";

type Properties = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  onChange: (data: number) => void
};

export const NumberInput: React.FC<Properties> = ({ ...rest }) => {
  const theme = useTheme();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(rest.onChange) {
      rest.onChange(Number(event.target.value))
    }
  }
  return <input type="number" css={input(theme)} {...rest} onChange={onChange} />;
};
