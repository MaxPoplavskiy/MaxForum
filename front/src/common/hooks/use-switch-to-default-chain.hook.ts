import { useCallback } from "react";
import { RpcError } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";

type Return = {
  switchToDefaultChain: () => void;
};
export const useSwitchToDefaultChain = (): Return => {
  const { chain } = useAccount();

  const switchToDefaultChain = useCallback(async () => {
    if (chain?.id === sepolia.id) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: '0xAA36A7',
          },
        ],
      });
    } catch (error: unknown) {
      if (error instanceof RpcError && error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: '0xAA36A7',
                chainName: sepolia.name,
                nativeCurrency: {
                  name: "Sepolia ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.sepolia.org"],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  }, [chain]);

  return {
    switchToDefaultChain,
  };
};
