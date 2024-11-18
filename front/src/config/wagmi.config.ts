import { createConfig, http } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { coinbaseWallet, metaMask } from "wagmi/connectors";

const { VITE_SEPOLIA_RPC } = import.meta.env;

export const wagmiConfig = createConfig({
  chains: [hardhat, sepolia],
  connectors: [metaMask(), coinbaseWallet()],
  multiInjectedProviderDiscovery: false,
  transports: {
    [hardhat.id]: http(),
    [sepolia.id]: http(VITE_SEPOLIA_RPC),
  },
});
