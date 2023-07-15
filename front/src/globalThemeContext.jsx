import { createContext } from "react";

const Themes =
{
    Light: "light",
    Dark: "dark",
}

function cssLightHandle(classname, theme)
{
    return classname + (theme === "light" ? " light" : "")
}

export { cssLightHandle };
export const globalThemeContext = createContext("dark");