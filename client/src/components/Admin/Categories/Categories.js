import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

// actions
import { getCategories } from "../../../actions/categories";

// layout
import Spinner from "../../layout/Spinner";
import AddCategoriesModal from "../Modals/AddCategories";

// components
import CategoryItem from "./CategoryItem";

const Categories = ({ getCategories, loading }) => {
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
          add category
        </button>
        <AddCategoriesModal
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
};

Categories.probTypes = {
  loading: PropTypes.bool.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    loading: state.categories.loading
  };
};

export default connect(mapStateToProps, { getCategories })(Categories);
