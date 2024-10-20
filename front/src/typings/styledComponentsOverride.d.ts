import { SerializedStyles } from "@emotion/react";

declare module 'react' {
    interface Attributes {
       css?: SerializedStyles | (SerializedStyles | undefined | boolean)[]
    }
}