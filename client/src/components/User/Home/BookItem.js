import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// layout
import Spinner from "../../layout/Spinner";
import SelectShelve from "../../layout/SelectShelve";
import BookRating from "../../layout/Rating";

// utils
import getBookShelve from "../../../utils/getBookShelve";

const BookItem = ({ userBooks, loading }) => {
  return loading ? (
    <tr>
      <td>
        <Spinner />
      </td>
    </tr>
  ) : userBooks.length <= 0 ? (
    <tr>
      <td colSpan="6">
        <h1>Your Library Has No Books in This Shleve!</h1>
      </td>
    </tr>
  ) : (
    userBooks.map((userBook) => {
      const { book } = userBook;
      return (
        <tr key={userBook._id}>
          {/* //! Book Cover Photo */}
          <td style={{ width: "20%" }} className="align-middle">
            {(book.hasPhoto && (
              <img
                src={`/api/books/${book._id}/photo`}
                width="100"
                height="100"
                className="img-thumbnail"
                alt={book.name}
              />
            )) ||
              "N/A"}
          </td>
          {/* //! Book Name */}
          <td style={{ width: "15%" }} className="align-middle text-capitalize">
            <Link to={`/books/${book._id}`}>{book.name}</Link>
          </td>
          {/* //! Author Name */}
          <td style={{ width: "15%" }} className="align-middle text-capitalize">
            <Link to={`/authors/${book.author._id}`}>{book.author.name}</Link>
          </td>
          {/* //! Avg Rating */}
          <td style={{ width: "15%" }} className="align-middle">
            <BookRating
              bookId={book._id}
              bookShelve={{ shelve: "no shelve" }}
            />
          </td>
          {/* //! User Rating Rating */}
          <td style={{ width: "15%" }} className="align-middle">
            <BookRating
              bookId={book._id}
              bookShelve={getBookShelve(book._id, userBooks)}
            />
          </td>
          {/* //! Book Shelve */}
          <td style={{ width: "20%" }} className="align-middle">
            <SelectShelve
              bookId={book._id}
              bookShelve={getBookShelve(book._id, userBooks)}
            />
          </td>
        </tr>
      );
    })
  );
};

BookItem.propTypes = {
  userBooks: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default BookItem;
