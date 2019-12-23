import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { getBooks } from "../../../redux/actions/books";

// layout
import Spinner from "../../layout/Spinner";

// Components
import BookItem from "../../layout/MuiCard";

const Books = ({ getBooks, books: { books, loading } }) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <main className="container">
      <h2>Books</h2>
      <section className="main-padding">
        <div className="row">
          {loading ? (
            <Spinner />
          ) : (
            (books.length > 0 &&
              books.map((book) => <BookItem key={book._id} book={book} />)) || (
              <h1>No Books in the Library!</h1>
            )
          )}
        </div>
      </section>
    </main>
  );
};

Books.propTypes = {
  books: PropTypes.object.isRequired,
  getBooks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  books: state.books
});

export default connect(mapStateToProps, { getBooks })(Books);
