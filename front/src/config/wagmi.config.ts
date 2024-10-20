import { http, createConfig } from 'wagmi'
import { hardhat } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  chains: [hardhat],
  connectors: [
    metaMask(),
  ],
  multiInjectedProviderDiscovery: false, 
  transports: {
    [hardhat.id]: http(),
  },
})