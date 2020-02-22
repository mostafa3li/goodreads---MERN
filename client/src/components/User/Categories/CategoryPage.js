import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { getCategory } from "../../../redux/actions/categories";

// layout
import Spinner from "../../layout/Spinner";

// Components
import BookItem from "../../layout/MuiCard";

const CategoryPage = ({
  getCategory,
  categories: { category, loading },
  match
}) => {
  useEffect(() => {
    getCategory(match.params.id);
  }, [getCategory, match.params.id]);

  return (
    <main className="container">
      {!category || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2 className="text-capitalize">{category.category}</h2>
          <section className="main-padding">
            <div className="row">
              {!category || loading ? (
                <Spinner />
              ) : (
                (category.books.length > 0 &&
                  category.books.map((book) => (
                    <BookItem key={book._id} book={book} />
                  ))) || <h1>No Books in This Category</h1>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </main>
  );
};

CategoryPage.propTypes = {
  categories: PropTypes.object.isRequired,
  getCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(mapStateToProps, { getCategory })(CategoryPage);
