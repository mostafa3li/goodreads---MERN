import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

// actions
import { getAuthors } from "../../../redux/actions/authors";

// layout
import AddAuthorsModal from "../Modals/AddAuthors";

// Components
import AuthorItem from "./AuthorItem";

const Authors = ({ getAuthors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAuthors();
  }, [getAuthors]);

  return (
    <div className="mx-3">
      <div className="text-right container my-4">
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
  getAuthors: PropTypes.func.isRequired
};

export default connect(null, { getAuthors })(Authors);
