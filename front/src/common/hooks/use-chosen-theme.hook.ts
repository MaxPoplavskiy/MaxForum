import { useTheme } from "../../store/theme.store";
import { THEMES } from "../constants/themes";
import { DarkTheme, LightTheme } from "../styles/themes";
import { Theme } from "../types";

export const useChosenTheme = (): Theme => {
  const { theme } = useTheme()

  if (theme === THEMES.DARK) {
    return DarkTheme
  } else {
    return LightTheme
  }
}