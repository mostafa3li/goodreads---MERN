import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

// actions
import { getBooks } from "../../../redux/actions/books";

// layout
import AddBooksModal from "../Modals/AddBooks";
import PaginationButtons from "../../layout/Pagination";

// components
import BookItem from "./BookItem";

const Books = ({ getBooks, books: { booksCount } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params] = useState({
    limit: 4,
    skip: 0,
    sortBy: "name"
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getBooks(params);
  }, [getBooks, params]);

  const changePageHandler = (page) => {
    if (currentPage !== page) {
      const { limit } = params;
      const skip = page * limit - limit;
      getBooks({ ...params, skip });
      setCurrentPage(page);
    }
  };

  return (
    <div className="mx-3">
      <div className="row">
        <div className="offset-lg-3 col-sm col">
          {booksCount > params.limit && (
            <PaginationButtons
              pagesCount={Math.ceil(booksCount / params.limit)}
              changePageHandler={changePageHandler}
            />
          )}
        </div>
        <div className="col-sm-3 col-5 text-right align-self-center">
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
  getBooks: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  books: state.books
});

export default connect(mapStateToProps, { getBooks })(Books);
