/* eslint-disable @typescript-eslint/no-unused-expressions */
import { injectGlobal } from "@emotion/css";
import { Orbitron } from "./fonts";

injectGlobal`
  h1, h2, h3, h4, h5, h6 {
    ${Orbitron}
  }

  a {
    text-decoration: none;
  }

  body { 
    margin: 0;
  }
`