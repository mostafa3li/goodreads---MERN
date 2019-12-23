import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { getAuthors } from "../../../redux/actions/authors";

// layout
import Spinner from "../../layout/Spinner";

// Components
import AuthorItem from "../../layout/MuiCard";

const Authors = ({ getAuthors, authors: { authors, loading } }) => {
  useEffect(() => {
    getAuthors();
  }, [getAuthors]);

  return (
    <main className="container">
      <h2>Authors</h2>
      <section className="main-padding">
        <div className="row">
          {loading ? (
            <Spinner />
          ) : (
            (authors.length > 0 &&
              authors.map((author) => (
                <AuthorItem key={author._id} author={author} />
              ))) || <h1>No Authors in the Library!</h1>
          )}
        </div>
      </section>
    </main>
  );
};

Authors.propTypes = {
  authors: PropTypes.object.isRequired,
  getAuthors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authors: state.authors
});

export default connect(mapStateToProps, { getAuthors })(Authors);
