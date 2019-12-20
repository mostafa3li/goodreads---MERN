import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

// actions
import { getBooks } from "../../../redux/actions/books";

// layout
import AddBooksModal from "../Modals/AddBooks";

// components
import BookItem from "./BookItem";

const Books = ({ getBooks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div className="mx-3">
      <div className="text-right container my-4">
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add Book
        </button>
        <AddBooksModal
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
        />
      </div>
      <Table className="text-center" striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <BookItem isModalOpen={isModalOpen} />
        </tbody>
      </Table>
    </div>
  );
};

Books.propTypes = {
  getBooks: PropTypes.func.isRequired
};

export default connect(null, { getBooks })(Books);
