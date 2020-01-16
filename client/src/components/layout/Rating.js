import React from "react";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

// actions
import { addBookShelve } from "../../redux/actions/userBooks";

const BookRating = ({ addBookShelve, ...props }) => {
  const {
    bookId,
    bookShelve: { shelve, rating }
  } = props;

  const onChange = (e, newRating) => addBookShelve(shelve, bookId, newRating);

  return (
    <Box component="fieldset" borderColor="transparent">
      <input type="hidden" value={bookId} />
      <Rating
        name={shelve === "no shelve" ? "read-only" : bookId}
        disabled={shelve === "no shelve" ? true : false}
        value={rating === "no rating" ? 0 : rating}
        onChange={(event, newValue) => onChange(event, newValue)}
      />
    </Box>
  );
};

export default connect(null, { addBookShelve })(BookRating);
