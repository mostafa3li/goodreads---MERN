import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// actions
import { getBook } from "../../../redux/actions/books";

// layout
import bookPhoto from "../../../assets/book-placeholder.png";
import Spinner from "../../layout/Spinner";

const BookPage = ({ getBook, books: { book, loading }, match }) => {
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

const mapStateToProps = (state) => ({
  books: state.books
});

export default connect(mapStateToProps, { getBook })(BookPage);
