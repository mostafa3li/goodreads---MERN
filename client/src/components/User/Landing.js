import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUserBooks } from "../../redux/actions/userBooks";

const Landing = ({ getUserBooks, userBooks }) => {
  // useEffect(() => {
  //   getUserBooks();
  // }, [getUserBooks]);

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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userBooks: state.userBooks
  };
};

export default connect(mapStateToProps, { getUserBooks })(Landing);
