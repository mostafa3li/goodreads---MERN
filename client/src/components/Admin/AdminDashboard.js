import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// layout
import Spinner from "../layout/Spinner";
import Navbar from "../layout/Navbar";

// components
import Tabs from "./Tabs";
// import Categories from "../Admin/Categories";

const AdminDashboard = ({ users: { loading, user } }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <section className="container">
        <h4>Admin Dashboard</h4>
      </section>
      <Tabs />
      {/* <Categories /> */}
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
