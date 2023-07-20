import { createContext } from "react";
import axios from "axios";

function logOut()
{
    axios.post("http://localhost:3000/logout").then((response) =>
    {
        console.log(response);
    });
}

export {logOut};
export const authStatusContext = createContext(false);