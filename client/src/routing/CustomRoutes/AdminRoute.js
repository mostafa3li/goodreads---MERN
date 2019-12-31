import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AdminRoute = ({
  component: Component,
  users: { isAuthenticated, user, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/admin" />
      ) : (
        (user && !user.isAdmin && <Redirect to="/" />) || (
          <Component {...props} />
        )
      )
    }
  ></Route>
);

AdminRoute.propTypes = {
  users: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(AdminRoute);
// user && !user.isAdmin && <Redirect to="/" />) ||
