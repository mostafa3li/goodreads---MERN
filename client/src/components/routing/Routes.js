import React from "react";
import { Switch, Route } from "react-router-dom";

// Custom Route
import AdminRoute from "./AdminRoute";
// import PrivateRoute from "./PrivateRoute";

// Components
import AdminLogin from "../auth/AdminLogin";
import AdminDashboard from "../Admin/AdminDashboard";
// import Alert from "../layout/Alert";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/admin/login" component={AdminLogin} />
      <AdminRoute exact path="/admin" component={AdminDashboard} />
      {/* <Alert /> */}
    </Switch>
  );
};
export default Routes;