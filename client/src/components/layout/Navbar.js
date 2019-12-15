import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// actions
import { logout } from "../../actions/users";

const DashboardNavbar = ({ user, logout }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="container">
        <Navbar.Brand>
          <Link to="/" className="brand-logo">
            goodreads
          </Link>
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
          <h5 className="mx-2 d-inline">{user && user.name}</h5>
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
