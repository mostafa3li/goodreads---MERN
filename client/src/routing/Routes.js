import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

// Custom Routes
import AdminRoute from "./CustomRoutes/AdminRoute";
import PrivateRoute from "./CustomRoutes/PrivateRoute";

// layout
import Navbar from "../components/layout/Navbar";

// ------ Components ------ //
// Admin
import AdminLogin from "../components/Admin/auth/AdminLogin";
import AdminDashboard from "../components/Admin/AdminDashboard";
// User
import Landing from "../components/User/Landing";
import HomePage from "../components/User/auth/HomePage";
import SiteRoutes from "./CustomRoutes/SiteRoutes";

const Routes = ({ users: { isAuthenticated } }) => {
  return (
    <Switch>
      {isAuthenticated ? (
        <Fragment>
          <Navbar />
          <AdminRoute exact path="/admin" component={AdminDashboard} />
          <PrivateRoute exact path="/" component={Landing} />
          <SiteRoutes />
        </Fragment>
      ) : (
        <Fragment>
          <Route exact path="/admin" component={AdminLogin} />
          <Route exact path="/" component={HomePage} />
          <SiteRoutes />
        </Fragment>
      )}
    </Switch>
  );
};

Routes.prototype = {
  users: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(Routes);
