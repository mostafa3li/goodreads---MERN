import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

// actions
import { getAuthor } from "../../../redux/actions/authors";

// layout
import authorAvatar from "../../../assets/userAvatar.png";
import Spinner from "../../layout/Spinner";

// Components
import AuthorBooks from "./AuthorBooks";

const AuthorPage = ({ getAuthor, authors: { author, loading }, match }) => {
  useEffect(() => {
    getAuthor(match.params.id);
  }, [getAuthor, match.params.id]);

  return (
    <main className="container">
      {!author || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2 className="text-uppercase">{author.name}</h2>
          <section className="main-padding">
            <div className="media">
              <Card raised className="mr-3">
                <CardMedia
                  style={{ height: "200px", width: "200px" }}
                  image={
                    (author.hasAvatar && `/api/authors/${author._id}/avatar`) ||
                    authorAvatar
                  }
                />
              </Card>
              <div className="media-body">
                <h5 className="mt-0 text-capitalize">{author.name}</h5>
                <h6 className="mt-0 text-capitalize">
                  <Moment format="MMM DD, YYYY">{author.birthDate}</Moment>
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
          {author.books.length > 0 && <AuthorBooks author={author} />}
        </Fragment>
      )}
    </main>
  );
};

AuthorPage.propTypes = {
  authors: PropTypes.object.isRequired,
  getAuthor: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authors: state.authors
});

export default connect(mapStateToProps, { getAuthor })(AuthorPage);
