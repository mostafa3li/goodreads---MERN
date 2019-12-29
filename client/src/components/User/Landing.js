import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

// actions
import { getUserBooks } from "../../redux/actions/userBooks";

// Components
import BooksTable from "./Home/BooksTable";

const Landing = ({ userBooks: { userBooks, loading } }) => {
  const getShelves = (bookStatus) => {
    if (!loading && userBooks.length > 0) {
      return bookStatus === "all"
        ? userBooks
        : userBooks.filter((userBook) => userBook.shelve[0] === bookStatus);
    }
    return [];
  };

  return (
    <main>
      <h2 className="text-center mb-4">Welcome to goodreads</h2>
      <Tabs
        defaultActiveKey="all"
        id="uncontrolled-tab-example"
        className="d-flex justify-content-center"
      >
        <Tab eventKey="all" title="All">
          <BooksTable userBooks={getShelves("all")} loading={loading} />
        </Tab>
        <Tab eventKey="read" title="Read">
          <BooksTable userBooks={getShelves("read")} loading={loading} />
        </Tab>
        <Tab eventKey="currently" title="Currently Reading">
          <BooksTable userBooks={getShelves("currently")} loading={loading} />
        </Tab>
        <Tab eventKey="want" title="Want To Read">
          <BooksTable userBooks={getShelves("want")} loading={loading} />
        </Tab>
      </Tabs>
    </main>
  );
};

Landing.propTypes = {
  userBooks: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  userBooks: state.userBooks
});

export default connect(mapStateToProps, { getUserBooks })(Landing);
