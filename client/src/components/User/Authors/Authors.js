import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { getAuthors } from "../../../redux/actions/authors";

// layout
import Spinner from "../../layout/Spinner";
import PaginationButtons from "../../layout/Pagination";

// Components
import AuthorItem from "../../layout/MuiCard";

const Authors = ({
  getAuthors,
  authors: { authors, loading, authorsCount }
}) => {
  const [params] = useState({
    limit: 8,
    skip: 0,
    sortBy: "name"
  });

  useEffect(() => {
    getAuthors(params);
  }, [getAuthors, params]);

  const changePageHandler = (page) => {
    const { limit } = params;
    const skip = page * limit - limit;
    getAuthors({ ...params, skip });
  };

  return (
    <main className="container">
      <h2>Authors</h2>
      <section className="main-padding">
        <div className="row">
          {loading ? (
            <Spinner />
          ) : (
            (authors &&
              authors.length > 0 &&
              authors.map((author) => (
                <AuthorItem key={author._id} author={author} />
              ))) || <h1>No Authors in the Library!</h1>
          )}
        </div>
        {authors && authorsCount > params.limit && (
          <PaginationButtons
            pagesCount={Math.ceil(authorsCount / params.limit)}
            changePageHandler={changePageHandler}
          />
        )}
      </section>
    </main>
  );
};

Authors.propTypes = {
  authors: PropTypes.object.isRequired,
  getAuthors: PropTypes.func.isRequired,
  authorsCount: PropTypes.number
};

const mapStateToProps = (state) => ({
  authors: state.authors
});

export default connect(mapStateToProps, { getAuthors })(Authors);
