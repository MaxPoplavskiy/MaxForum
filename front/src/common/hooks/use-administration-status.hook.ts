import { useEffect, useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";
import { AdministrationAbi } from "../abi";
import { UserStatus } from "../types";

type Return = {
  isAdmin: boolean;
  userStatus: UserStatus;
  benefactorRequestsAmount: number;
};

const { VITE_ADMINISTRATOR_CONTRACT } = import.meta.env;

export const useAdministrationStatusHook = (): Return => {
  const { address } = useAccount();
  const { data: adminAddressData } = useReadContract({
    abi: AdministrationAbi,
    address: VITE_ADMINISTRATOR_CONTRACT,
    functionName: "administrator",
  });
  const { data: userStatus } = useReadContract({
    abi: AdministrationAbi,
    address: VITE_ADMINISTRATOR_CONTRACT,
    functionName: "userStatus",
    args: [address],
  });
  const { data: requestsAmount, refetch: refetchRequestsAmount } =
    useReadContract({
      abi: AdministrationAbi,
      address: VITE_ADMINISTRATOR_CONTRACT,
      functionName: "getBenefactorRequestsLength",
    });

  useEffect(() => {
    const interval = setInterval(() => {
      refetchRequestsAmount();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetchRequestsAmount]);

  const isAdmin = useMemo(() => {
    return adminAddressData === address;
  }, [adminAddressData, address]);

  return {
    isAdmin,
    userStatus: userStatus as UserStatus,
    benefactorRequestsAmount: (requestsAmount as number) ?? 0,
  };
};
