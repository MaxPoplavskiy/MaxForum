import { Route } from "react-router-dom";
import { RouterKey } from "../../common/constants";
import { AccountModeration } from "../../modules/account-moderation/account-moderation.component";
import { AdminRoute } from "./admin-routes.component";
import { BenefactorRequestModeration } from "../../modules/benefactor-request-moderation/benefactor-request-moderation.component";

export const AdminRoutes = () => {
  return (
    <Route element={<AdminRoute />}>
      <Route
        path={RouterKey.ACCOUNT_MODERATION}
        element={<AccountModeration />}
      />
            <Route
        path={RouterKey.MODERATE_BENEFACTOR_REQUEST}
        element={<BenefactorRequestModeration />}
      />
    </Route>
  );
};
