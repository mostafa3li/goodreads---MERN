import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

// actions
import { getCategories } from "../../../redux/actions/categories";

// layout
import AddCategoriesModal from "../Modals/AddCategories";
import PaginationButtons from "../../layout/Pagination";

// components
import CategoryItem from "./CategoryItem";

const Categories = ({ getCategories, categories: { categoriesCount } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params] = useState({
    limit: 5,
    skip: 0,
    sortBy: "category"
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getCategories(params);
  }, [getCategories, params]);

  const changePageHandler = (page) => {
    if (currentPage !== page) {
      const { limit } = params;
      const skip = page * limit - limit;
      getCategories({ ...params, skip });
      setCurrentPage(page);
    }
  };

  return (
    <div className="mx-3">
      <div className="row">
        <div className="offset-lg-3 col-sm col">
          {categoriesCount > params.limit && (
            <PaginationButtons
              pagesCount={Math.ceil(categoriesCount / params.limit)}
              changePageHandler={changePageHandler}
            />
          )}
        </div>
        <div className="col-sm-3 col-5 text-right align-self-center">
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
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(mapStateToProps, { getCategories })(Categories);
