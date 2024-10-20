import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RouterKey } from "../common/constants";
import { LOCAL_STORAGE_KEYS } from "../common/constants/local-storage-keys.constant";
import { THEMES } from "../common/constants/themes";
import { Account } from "../modules/account/account.component";
import { Home } from "../modules/home/home.component";
import { NotFound } from "../modules/not-found";
import { useTheme } from "../store/theme.store";
import { PrivateRoutes } from "./private-routes/private-routes.router";

const AppRoutes = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    const theme =
      (localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as THEMES | undefined) ??
      THEMES.LIGHT;

    setTheme(theme);
  }, [setTheme]);
  return (
    <Routes>
      {PrivateRoutes()}
      <Route path={RouterKey.ROOT} element={<Home />} />
      <Route path={RouterKey.ACCOUNT} element={<Account />} />
      <Route path={RouterKey.NOT_FOUND} element={<NotFound />} />
      <Route
        path={RouterKey.ALL}
        element={<Navigate to={RouterKey.NOT_FOUND} />}
      />
    </Routes>
  );
};

export default AppRoutes;
