import { useCallback } from "react";
import { RpcError } from "viem";
import { hardhat } from "viem/chains";
import { useAccount } from "wagmi";

type Return = {
  switchToDefaultChain: () => void;
};
export const useSwitchToDefaultChain = (): Return => {
  const { chain } = useAccount();

  const switchToDefaultChain = useCallback(async () => {
    if (chain?.id === hardhat.id) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: '0x7A69',
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
                chainId: '0x7A69',
                chainName: hardhat.name,
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
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
