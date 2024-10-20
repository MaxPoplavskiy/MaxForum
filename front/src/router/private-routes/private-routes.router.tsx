import { Route } from "react-router-dom";
import { RouterKey } from "../../common/constants";
import { PrivateRoute } from "./private-routes.component";
import { CreateFundraising } from "../../modules/create-fundraising";
import { Fundraisers } from "../../modules/fundraisers";

export const PrivateRoutes = () => {
  return (
    <Route element={<PrivateRoute />}>
      <Route path={RouterKey.FUNDRAISING.INDEX}>
        <Route index element={<Fundraisers />} />
        <Route path={RouterKey.FUNDRAISING.CREATE} element={<CreateFundraising />} />
        <Route path={RouterKey.FUNDRAISING.MY_FUNDRAISERS} />
      </Route>
    </Route>
  );
};
