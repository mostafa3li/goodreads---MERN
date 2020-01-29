import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import Button from "@material-ui/core/Button";
import { LinkContainer } from "react-router-bootstrap";

// actions
import { logout } from "../../redux/actions/users";

// layout
import logo from "../../assets/logo.png";

const DashboardNavbar = ({ user, logout }) => {
  const routes = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Categories",
      path: "/categories"
    },
    {
      name: "Books",
      path: "/books"
    },
    {
      name: "Authors",
      path: "/authors"
    }
  ];

  return (
    <Navbar className="home-nav" expand="md" collapseOnSelect>
      <div className="container">
        <LinkContainer to="/">
          <Nav.Link eventKey={6} className="navbar-brand">
            <img
              src={logo}
              width="200"
              height="45"
              className="d-inline-block align-top"
              alt="Goodreads Logo"
            />
          </Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey="/">
            {routes.map((route, key) => (
              <Nav.Item key={key}>
                <LinkContainer to={route.path} exact>
                  <Nav.Link eventKey={key}>{route.name}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
          <Nav className="ml-auto">
            <div className="nav-profile">
              <ul className="list-unstyled m-0">
                {user && user.isAdmin && (
                  <li>
                    <LinkContainer to="/admin">
                      <Nav.Link to="/admin" className="nav-admin">
                        Admin Dashboard
                      </Nav.Link>
                    </LinkContainer>
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
