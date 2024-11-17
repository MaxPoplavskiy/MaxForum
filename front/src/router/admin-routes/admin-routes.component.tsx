import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import { RouterKey } from "../../common/constants";
import { useAdministrationStatusHook } from "../../common/hooks";

export const AdminRoute = () => {
  const { isConnected } = useAccount();
  const { isAdmin } = useAdministrationStatusHook();
  
  return isConnected && isAdmin ? <Outlet /> : <Navigate to={RouterKey.ROOT} />;
};
