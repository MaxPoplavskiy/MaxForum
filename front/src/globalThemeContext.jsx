import { createContext } from "react";

const Themes =
{
    Light: "light",
    Dark: "dark",
}

export const globalThemeContext = createContext("dark");