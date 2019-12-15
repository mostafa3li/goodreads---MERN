import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

const Landing = () => {
  return (
    <main>
      <h1>Landing Page</h1>
      <br />
      <h3>Authenticated User</h3>
      <br />
    </main>
  );
};

Landing.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Landing);
