import { createContext } from "react";

function cssLightHandle(classname, theme)
{
    return classname + (theme === "light" ? " light" : "")
}

export { cssLightHandle };
export const globalThemeContext = createContext("dark");