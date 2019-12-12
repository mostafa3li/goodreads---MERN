import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

// actions
import { logout } from "../../actions/users";

const DashboardNavbar = ({ logout }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="container">
        <Navbar.Brand>
          <Link to="/admin" className="brand-logo">
            goodreads
          </Link>
        </Navbar.Brand>
        {/* <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav> */}
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </Navbar>
  );
};

export default connect(null, { logout })(DashboardNavbar);
// <nav>
//   <div className="container">
//     <div className="nav-wrapper">
//       <Link to="/admin" className="brand-logo">
//         Logo
//       </Link>
//       <ul id="nav-mobile" className="right hide-on-med-and-down">
//         <li>
//           <button
//             onClick={logout}
//             className="waves-effect waves-light btn red"
//           >
//             Logout
//           </button>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>
