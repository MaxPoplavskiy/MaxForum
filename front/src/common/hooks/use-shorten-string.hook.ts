import { useMemo } from "react";

export const useShortenString = (string: string | undefined): string => {
  const result = useMemo(() => {
    if (!string) return "";
    return string.slice(0, 10) + "..." + string.slice(-6);
  }, [string]);
  return result;
};
