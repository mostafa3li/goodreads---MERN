import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

// layout
import bookPhoto from "../../../assets/book-placeholder.png";
import BookRating from "../../layout/Rating";
import SelectShelve from "../../layout/SelectShelve";

// utils
import getBookShelve from "../../../utils/getBookShelve";

const AuthorBooks = ({ userBooks: { userBooks }, author }) => {
  return (
    <section className="main-padding">
      <h2 className="text-capitalize">{author.name}'s Books</h2>
      {author.books.map((book) => {
        return (
          <div className="media each-author-book" key={book._id}>
            <Card raised className="mr-3">
              <CardMedia
                style={{ height: "100px", width: "100px" }}
                image={
                  (book.hasPhoto && `/api/books/${book._id}/photo`) || bookPhoto
                }
              />
            </Card>
            <div className="media-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="mt-2 text-capitalize">
                    <Link to={`/books/${book._id}`}>{book.name}</Link>
                  </h5>
                  {/* // TODO Rating & no. of ratings */}
                  <BookRating disabled={true} />
                </div>
                <div className="m-2">
                  <SelectShelve
                    bookId={book._id}
                    shelve={getBookShelve(book._id, userBooks)}
                  />
                  <div className="text-center mt-2">
                    {/* //TODO Rating */}
                    <BookRating />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

AuthorBooks.propTypes = {
  author: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  userBooks: state.userBooks
});

export default connect(mapStateToProps)(AuthorBooks);