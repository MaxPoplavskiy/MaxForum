import { createConfig, http } from "wagmi";
import { hardhat } from "wagmi/chains";
import { coinbaseWallet, metaMask } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [hardhat],
  connectors: [metaMask(), coinbaseWallet()],
  multiInjectedProviderDiscovery: false,
  transports: {
    [hardhat.id]: http(),
  },
});
