import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// actions
import { adminLogin } from "../../actions/users";

// layout
import Spinner from "../layout/Spinner";

const AdminLogin = ({
  adminLogin,
  users: { isAuthenticated, loading, user }
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    adminLogin(email, password);
  };

  //! Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/admin"></Redirect>;
  }

  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2>Welcome to Admin Panel</h2>
      <div className="z-depth-3 p-3 rounded">
        <h4 className="my-2">Login if your an admin</h4>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="input-field col s6">
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s6">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="submit"
            value="login"
            className="waves-effect waves-light btn"
          />
        </form>
      </div>
    </Fragment>
  );
};

AdminLogin.propTypes = {
  // isAuthenticated: PropTypes.bool,
  users: PropTypes.object.isRequired,
  adminLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  // isAuthenticated: state.users.isAuthenticated
  users: state.users
});

export default connect(mapStateToProps, { adminLogin })(AdminLogin);
