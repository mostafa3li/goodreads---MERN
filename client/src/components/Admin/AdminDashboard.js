import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { logout } from "../../actions/users";

// layout
import Spinner from "../layout/Spinner";

const AdminDashboard = ({ logout, users: { loading, user } }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <button onClick={logout} className="waves-effect waves-light btn red">
        Logout
      </button>
    </div>
  );
};

AdminDashboard.ProbTypes = {
  users: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, { logout })(AdminDashboard);
