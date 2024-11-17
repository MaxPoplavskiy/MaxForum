import { StylesConfig } from "react-select";
import { weights } from "../../styles";
import { Theme } from "../../types";

interface OptionType {
  label: string;
  value: string;
}

export const selectStyles = (
  theme: Theme
): StylesConfig<OptionType, false> => ({
  control: (provided) => ({
    ...provided,
    minWidth: "150px",
    fontFamily: "Orbitron",
    borderColor: theme.colors.secondary,
    borderWidth: "3px",
    background: theme.colors.primary,
    color: theme.colors.secondary,
    fontWeight: weights.bold,
    "&:hover": { borderColor: theme.colors.secondary },
    outline: "none",
    boxShadow: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: theme.colors.secondary,
    opacity: 1,
    borderColor: theme.colors.secondary,
  }),
  option: (provided) => ({
    ...provided,
    fontFamily: "Orbitron",
    fontWeight: weights.bold,
    color: theme.colors.secondary,
    background: theme.colors.primary,
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "none",
    border: '1px black solid',
    borderColor: theme.colors.secondary
  }),
});
