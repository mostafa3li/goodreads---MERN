import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { getBooks } from "../../../redux/actions/books";

// layout
import Spinner from "../../layout/Spinner";
import PaginationButtons from "../../layout/Pagination";

// Components
import BookItem from "../../layout/MuiCard";

const Books = ({ getBooks, books: { books, loading, booksCount } }) => {
  const [params] = useState({
    limit: 8,
    skip: 0,
    sortBy: "name"
  });

  useEffect(() => {
    getBooks(params);
  }, [getBooks, params]);

  const changePageHandler = (page) => {
    const { limit } = params;
    const skip = page * limit - limit;
    getBooks({ ...params, skip });
  };

  return (
    <main className="container">
      <h2>Books</h2>

      <section className="main-padding">
        <div className="row">
          {loading ? (
            <Spinner />
          ) : (
            (books &&
              books.length > 0 &&
              books.map((book) => <BookItem key={book._id} book={book} />)) || (
              <h1>No Books in the Library!</h1>
            )
          )}
        </div>
        {books && booksCount > params.limit && (
          <PaginationButtons
            pagesCount={Math.ceil(booksCount / params.limit)}
            changePageHandler={changePageHandler}
          />
        )}
      </section>
    </main>
  );
};

Books.propTypes = {
  books: PropTypes.object.isRequired,
  getBooks: PropTypes.func.isRequired,
  booksCount: PropTypes.number
};

const mapStateToProps = (state) => ({
  books: state.books
});

export default connect(mapStateToProps, { getBooks })(Books);
