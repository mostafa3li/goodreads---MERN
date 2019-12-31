import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavLink from "react-bootstrap/NavLink";
import Button from "@material-ui/core/Button";

// layout
import logo from "../../../assets/logo.png";

const LoginNavbar = (props) => {
  return (
    <Navbar className="home-nav">
      <div className="container">
        <Navbar.Brand>
          <NavLink to="/">
            <img
              src={logo}
              width="200"
              height="45"
              className="d-inline-block align-top"
              alt="Goodreads Logo"
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ml-auto">
            <div className=" mx-2 d-none d-sm-inline">
              {(props.loginFormStatus && "New Here ?") || "Already a User ?"}
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.changeFormHandler()}
            >
              {(props.loginFormStatus && "Sign Up") || "Sign In"}
            </Button>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default LoginNavbar;
