import { useTheme } from "@emotion/react";
import { container, title } from "./not-found.styles";

export function NotFound() {
  const theme = useTheme();

  return (
    <div css={container}>
      <h1 css={title(theme)}>404</h1>
    </div>
  );
}
