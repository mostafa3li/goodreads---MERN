import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";

// actions
import { deleteCategory, editCategory } from "../../../actions/categories";

// layout
import Spinner from "../../layout/Spinner";

const CategoryItem = ({
  deleteCategory,
  editCategory,
  categories: { categories, loading }
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editMode, setEditMode] = useState(false);

  const onChange = (e) => {
    setCategoryName(e.target.value);
  };

  const onEditHandler = (oldCategoryName, id) => {
    setCategoryId(id);
    setCategoryName(oldCategoryName);
    setEditMode(true);
  };

  const cancelEditHandler = () => {
    setCategoryId("");
    setCategoryName("");
    setEditMode(false);
  };

  const submitEditHandler = (oldCategoryName, categoryData) => {
    if (categoryData.categoryName !== oldCategoryName) {
      editCategory(categoryData);
    }
    cancelEditHandler();
  };

  return loading ? (
    <Spinner />
  ) : (
    categories.map((category) => (
      <tr key={category._id}>
        <td style={{ width: "20%" }}>{category._id.substr(-5)}</td>
        <td className="text-capitalize" style={{ width: "40%" }}>
          {/*  if EditMode will render the value inside an input to edit it */}
          {editMode && categoryId === category._id ? (
            <Fragment>
              <TextField
                type="text"
                name="category"
                value={categoryName}
                autoFocus
                onChange={(e) => onChange(e)}
              />
              <button onClick={() => cancelEditHandler()}>&#10006;</button>
              <button
                onClick={() =>
                  submitEditHandler(category.category, {
                    categoryName,
                    _id: category._id
                  })
                }
              >
                &#10004;
              </button>
            </Fragment>
          ) : (
            //* else will render the value
            category.category
          )}
        </td>
        <td style={{ width: "40%" }}>
          <button
            className="btn btn-info mx-2"
            onClick={() => onEditHandler(category.category, category._id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mx-2"
            onClick={() => deleteCategory(category._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  );
};

CategoryItem.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(mapStateToProps, { deleteCategory, editCategory })(
  CategoryItem
);
