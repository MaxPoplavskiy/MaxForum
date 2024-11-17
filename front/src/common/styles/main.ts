/* eslint-disable @typescript-eslint/no-unused-expressions */
import { injectGlobal } from "@emotion/css";
import { JosefinSans, Orbitron } from "./fonts";

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

  p {
    ${JosefinSans}
  }

  * {
    transition: color 0.5s ease, background-color 0.5s ease, border-color 0.5s ease;
  }
`;
