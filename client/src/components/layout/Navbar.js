import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "@material-ui/core/Button";

// actions
import { logout } from "../../redux/actions/users";

// layout
import logo from "../../assets/logo.png";

const DashboardNavbar = ({ user, logout }) => {
  return (
    <Navbar className="home-nav" expand="md">
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
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/categories" className="nav-link">
              Categories
            </Link>
            <Link to="/books" className="nav-link">
              Books
            </Link>
            <Link to="/authors" className="nav-link">
              Authors
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <div className="nav-profile">
              <ul className="list-unstyled m-0">
                {user && user.isAdmin && (
                  <li>
                    <Link to="/admin">Admin Dashboard</Link>
                  </li>
                )}
                <li>
                  <h5 className="my-0 mx-2 d-inline text-capitalize">
                    {user && user.name}
                  </h5>
                </li>
              </ul>
              <Button onClick={logout} variant="contained" color="secondary">
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

Navbar.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.users.user
});

export default connect(mapStateToProps, { logout })(DashboardNavbar);
