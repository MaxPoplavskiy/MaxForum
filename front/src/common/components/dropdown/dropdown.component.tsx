import { useTheme } from "@emotion/react";
import Select from "react-select";
import { selectStyles } from "./dropdown.styles";

type OptionType = { label: string; value: string };

type Properties<T> = {
  values: OptionType[];
  placeholder?: string;
  onChange?: (value: T) => void;
};
export const Dropdown = <T,>({
  values,
  placeholder = "Select an option",
  onChange,
}: Properties<T>) => {
  const theme = useTheme();

  const handleChange = (selectedOption: OptionType | null) => {
    onChange?.(selectedOption?.value as T);
  };

  return (
    <Select
      onChange={handleChange}
      placeholder={placeholder}
      options={values}
      styles={selectStyles(theme)}
    />
  );
};
