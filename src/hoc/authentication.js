import { path } from "../utils/constants";

import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: path.LOGIN_PAGE,
  authenticatedSelector: (state) => state.user.isLoggedIn,
  wrapperDisplayName: "UserIsAuthenticated",
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  // Want to redirect the user when they are authenticated
  authenticatedSelector: (state) => !state.user.isLoggedIn,
  wrapperDisplayName: "UserIsNotAuthenticated",
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/home",
  allowRedirectBack: false,
});
