import Coinbase from "../../assets/icons/coinbase.svg?react";
import MetaMask from "../../assets/icons/MetaMask.png";

export const connectorToIcon: Record<string, JSX.Element> = {
  "Coinbase Wallet": <Coinbase width={25} height={25} />,
  MetaMask: <img src={MetaMask} width={25} height={25} />
};
