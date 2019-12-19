import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <main>
      <h1>Landing Page</h1>
      <br />
      <h3>Unauthenticated User</h3>
      <h3>LOGIN</h3>
      <br />
      <Link to="/admin">Admin</Link>
    </main>
  );
};

Login.propTypes = {};

export default Login;
