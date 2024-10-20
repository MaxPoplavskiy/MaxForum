import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import { RouterKey } from "../../common/constants";

export const PrivateRoute = () => {
  const { isConnected } = useAccount();
  
  return isConnected ? <Outlet /> : <Navigate to={RouterKey.ROOT} />;
};
