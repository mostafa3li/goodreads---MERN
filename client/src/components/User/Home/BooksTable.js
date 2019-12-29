import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

// Components
import BookItem from "./BookItem";

const BooksTable = ({ userBooks, loading }) => {
  return (
    <Table className="text-center" striped bordered hover responsive>
      <thead>
        <tr>
          <th>Cover</th>
          <th>Name</th>
          <th>Author</th>
          <th>Avg Rating</th>
          <th>Rating</th>
          <th>Shelve</th>
        </tr>
      </thead>
      <tbody>
        <BookItem userBooks={userBooks} loading={loading} />
      </tbody>
    </Table>
  );
};

BooksTable.propTypes = {
  userBooks: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default BooksTable;
