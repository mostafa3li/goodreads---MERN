import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Security from "@material-ui/icons/Security";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// actions
import { adminLogin } from "../../actions/users";

// layout
import Spinner from "../layout/Spinner";

import "./AdminLogin.css";

const AdminLogin = ({
  adminLogin,
  users: { isAuthenticated, loading, user }
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClickShowPassword = () =>
    setFormData({ ...formData, showPassword: !formData.showPassword });

  const handleMouseDownPassword = (event) => event.preventDefault();

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
      <div className="container">
        <h1>Welcome to Admin Panel</h1>
        <div className="p-3 rounded">
          <h4 className="text-center my-3 mb-5">Login if you're an admin</h4>
          <Paper className="row justify-content-center py-5">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email"
                      type="email"
                      name="email"
                      value={email}
                      label="email"
                      labelWidth={40}
                      autoFocus
                      onChange={(e) => onChange(e)}
                    />
                  </FormControl>
                </Grid>
              </div>
              <div className="form-group">
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Security />
                  </Grid>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="password"
                      label="password"
                      type={formData.showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => onChange(e)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {formData.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                </Grid>
              </div>
              <div className="text-center">
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  value="login"
                >
                  Login
                </Button>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </Fragment>
  );
};

AdminLogin.propTypes = {
  users: PropTypes.object.isRequired,
  adminLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, { adminLogin })(AdminLogin);
