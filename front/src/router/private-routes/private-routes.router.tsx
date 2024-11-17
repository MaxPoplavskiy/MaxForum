import { Route } from "react-router-dom";
import { RouterKey } from "../../common/constants";
import { PrivateRoute } from "./private-routes.component";
import { CreateFundraising } from "../../modules/create-fundraising";
import { Fundraisers } from "../../modules/fundraisers";
import { Fundraiser } from "../../modules/fundraiser/fundraiser.component";
import { BenefactorRequestCreate } from "../../modules/create-benefactor-request/create-benefactor-request.component";

export const PrivateRoutes = () => {
  return (
    <Route element={<PrivateRoute />}>
      <Route path={RouterKey.FUNDRAISING.INDEX}>
        <Route index element={<Fundraisers />} />
        <Route path={RouterKey.FUNDRAISING.CREATE} element={<CreateFundraising />} />
        <Route path={RouterKey.FUNDRAISING.MY_FUNDRAISERS} element={<Fundraisers type='My' />} />
        <Route path={RouterKey.FUNDRAISING.ID} element={<Fundraiser />} />
      </Route>
      <Route path={RouterKey.BENEFACTOR_REQUEST} element={<BenefactorRequestCreate />} />
    </Route>
  );
};
