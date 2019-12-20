import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// actions
import { logout } from "../../redux/actions/users";

// layout
import logo from "../../assets/logo.png";

const DashboardNavbar = ({ user, logout }) => {
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
        <div className="text-white">
          {user && user.isAdmin && <Link to="/admin">Admin Dashboard</Link>}
          <h5 className="mx-2 d-inline text-capitalize">{user && user.name}</h5>
        </div>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
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
