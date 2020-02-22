import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

// actions
import { getAuthors } from "../../../redux/actions/authors";

// layout
import AddAuthorsModal from "../Modals/AddAuthors";
import PaginationButtons from "../../layout/Pagination";

// Components
import AuthorItem from "./AuthorItem";

const Authors = ({ getAuthors, authors: { authorsCount } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params] = useState({
    limit: 4,
    skip: 0,
    sortBy: "name"
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAuthors(params);
  }, [getAuthors, params]);

  const changePageHandler = (page) => {
    if (currentPage !== page) {
      const { limit } = params;
      const skip = page * limit - limit;
      getAuthors({ ...params, skip });
      setCurrentPage(page);
    }
  };

  return (
    <div className="mx-3">
      <div className="row">
        <div className="offset-lg-3 col-sm col">
          {authorsCount > params.limit && (
            <PaginationButtons
              pagesCount={Math.ceil(authorsCount / params.limit)}
              changePageHandler={changePageHandler}
            />
          )}
        </div>
        <div className="col-sm-3 col-5 text-right align-self-center">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add Author
          </button>
          <AddAuthorsModal
            show={isModalOpen}
            onHide={() => setIsModalOpen(false)}
          />
        </div>
      </div>
      <Table className="text-center" striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AuthorItem isModalOpen={isModalOpen} />
        </tbody>
      </Table>
    </div>
  );
};

Authors.probTypes = {
  getAuthors: PropTypes.func.isRequired,
  authors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  authors: state.authors
});

export default connect(mapStateToProps, { getAuthors })(Authors);
