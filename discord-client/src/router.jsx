import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import IndexPage from "./pages";
import LoginPage from "./pages/login";
import DefaultLayout from "./layouts/default";
import AuthLayout from "./layouts/auth";
import NotFound from "./components/common/NotFound";
import DirectMessagePage from "./pages/dm/_id";
import AuthRoute from "./components/utils/AuthRoute";

const AppRouter = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={["/", "/dashboard", "/dashboard/@dm/:id"]}>
          <DefaultLayout>
            <AuthRoute exact path="/">
              <Redirect to="/dashboard" />
            </AuthRoute>
            <AuthRoute exact path="/dashboard">
              <IndexPage />
            </AuthRoute>
            <AuthRoute exact path="/dashboard/@dm/:id">
              <DirectMessagePage />
            </AuthRoute>
          </DefaultLayout>
        </Route>

        <Route exact path={["/login"]}>
          <AuthLayout>
            <Route exact path="/login">
              <LoginPage />
            </Route>
          </AuthLayout>
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
