import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// layout
import Spinner from "../layout/Spinner";
import Navbar from "../layout/Navbar";

// components
import Tabs from "./Tabs";

const AdminDashboard = ({ users: { loading, user } }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <section className="container">
        <h3 className="my-3 text-center">Admin Dashboard</h3>
      </section>
      <Tabs />
    </Fragment>
  );
};

AdminDashboard.probTypes = {
  users: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(AdminDashboard);
