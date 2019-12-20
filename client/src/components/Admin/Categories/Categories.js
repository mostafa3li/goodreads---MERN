import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

// actions
import { getCategories } from "../../../redux/actions/categories";

// layout
import AddCategoriesModal from "../Modals/AddCategories";

// components
import CategoryItem from "./CategoryItem";

const Categories = ({ getCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div className="mx-3">
      <div className="text-right container my-4">
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add Category
        </button>
        <AddCategoriesModal
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
        />
      </div>
      <Table className="text-center" striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <CategoryItem isModalOpen={isModalOpen} />
        </tbody>
      </Table>
    </div>
  );
};

Categories.probTypes = {
  getCategories: PropTypes.func.isRequired
};

export default connect(null, { getCategories })(Categories);
