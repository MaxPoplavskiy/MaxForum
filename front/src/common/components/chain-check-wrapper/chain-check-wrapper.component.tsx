import { useAccount } from "wagmi";
import { useSwitchToDefaultChain } from "../../hooks";
import { useEffect } from "react";

type Properties = {
  children: JSX.Element
}

export const ChainCheckWrapper: React.FC<Properties> = ({children}) => {
  const { chain } = useAccount();
  const { switchToDefaultChain } = useSwitchToDefaultChain();

  useEffect(() => {
    switchToDefaultChain();
  }, [switchToDefaultChain, chain]);

  return children
}