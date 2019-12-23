import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

import bookPhoto from "../../../assets/book-placeholder.png";

const AuthorBooks = ({ author }) => {
  return (
    <section className="main-padding">
      <h2 className="text-capitalize">{author.name}'s Books</h2>
      {author.books.map((book) => (
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
                {/* // TODO Rating */}
              </div>
              <div className="m-2">
                <FormControl className="w-100" variant="outlined">
                  <Select
                    labelId="edit_category"
                    name="categoryId"
                    value={"currently"}
                    // onChange={(e) => onChange(e)}
                  >
                    {/* {categories.map((category) => ( */}
                    <MenuItem value={"currently"}>Currently Reading</MenuItem>
                    <MenuItem value={"want"}>Want to Read</MenuItem>
                    <MenuItem value={"read"}>Read</MenuItem>
                    {/* ))} */}
                  </Select>
                </FormControl>
                {/* //TODO Rating */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

AuthorBooks.propTypes = {
  author: PropTypes.object.isRequired
};

export default AuthorBooks;
