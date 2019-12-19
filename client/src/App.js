import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./app.scss";

// actions
import { loadUser } from "./actions/users";

// layout
import Spinner from "./components/layout/Spinner";

// Components
import Routes from "./routing/Routes";

// import setAuthToken from "./utils/setAuthToken";

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = ({ users: { user, loading }, loadUser }) => {
  useEffect(() => {
    loadUser();
    // loading the user to verify existence, if not exist will dispatch AUTH_ERROR to show spinner in private routes.
  }, [loadUser]);

  return (
    <Router>
      <Fragment>
        <Switch>
          {loading && user === null ? (
            <Spinner />
          ) : (
            <Route component={Routes} />
          )}
        </Switch>
      </Fragment>
    </Router>
  );
};

App.propTypes = {
  users: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, { loadUser })(App);
