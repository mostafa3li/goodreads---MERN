import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

// actions
import { getBook } from "../../../redux/actions/books";

// layout
import bookPhoto from "../../../assets/book-placeholder.png";
import Spinner from "../../layout/Spinner";
import BookRating from "../../layout/Rating";
import SelectShelve from "../../layout/SelectShelve";

// utils
import getBookShelve from "../../../utils/getBookShelve";

const BookPage = ({
  getBook,
  books: { book, loading },
  userBooks: { userBooks },
  match
}) => {
  useEffect(() => {
    getBook(match.params.id);
  }, [getBook, match.params.id]);

  return (
    <main className="container">
      {!book || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2 className="text-uppercase">{book.name}</h2>
          <section className="main-padding">
            <div className="media">
              <Card raised className="mr-3">
                <CardMedia
                  style={{ height: "200px", width: "200px" }}
                  image={
                    (book.hasPhoto && `/api/books/${book._id}/photo`) ||
                    bookPhoto
                  }
                />
                <div className="m-2">
                  {/* //! Book Shelve  */}
                  <SelectShelve
                    bookId={match.params.id}
                    shelve={getBookShelve(match.params.id, userBooks)}
                  />
                  <div className="text-center mt-3">
                    {/* //TODO Rating */}
                    <BookRating />
                  </div>
                </div>
              </Card>
              <div className="media-body">
                <h5 className="mt-0 text-capitalize">{book.name}</h5>
                <h6 className="mt-0 text-capitalize">
                  By:{" "}
                  <Link to={`/authors/${book.author._id}`}>
                    {book.author.name}
                  </Link>
                </h6>
                <h6 className="mt-0 text-capitalize">
                  <Link to={`/categories/${book.category._id}`}>
                    {book.category.category}
                  </Link>
                </h6>
                <div>
                  {/* //TODO Rating & no. of ratings */}
                  <BookRating disabled={true} />
                </div>
                <p className="lead">
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                  vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                  nisi vulputate fringilla. Donec lacinia congue felis in
                  faucibus.
                </p>
              </div>
            </div>
          </section>
          <section>
            <h1>Reviews</h1>
          </section>
        </Fragment>
      )}
    </main>
  );
};

BookPage.propTypes = {
  books: PropTypes.object.isRequired,
  getBook: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  // console.log(
  //   state.userBooks.userBook && state.userBooks.userBook[0].shelve[0]
  // );
  return {
    books: state.books,
    userBooks: state.userBooks
  };
};

export default connect(mapStateToProps, { getBook })(BookPage);
