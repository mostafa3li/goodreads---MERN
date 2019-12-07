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

  const onEditHandler = (oldCategoryName, id) => {
    setCategoryId(id);
    setCategoryName(oldCategoryName);
    setEditMode(true);
  };

  const onChange = (e) => {
    setCategoryName(e.target.value);
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
    <tr>
      <td>
        <Spinner />
      </td>
    </tr>
  ) : (
    categories.map((category) => (
      <tr key={category._id}>
        <td style={{ width: "20%" }} className="align-middle">
          {/* //! ID , submit/cancel edit  */}
          {editMode && categoryId === category._id ? (
            <Fragment>
              <button title="Cancel" onClick={() => cancelEditHandler()}>
                &#10006;
              </button>
              <button
                title="Submit"
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
            category._id.substr(-5)
          )}
        </td>
        {/* //! Category, edit category */}
        <td className="text-capitalize align-middle" style={{ width: "40%" }}>
          {/*  if EditMode will render the value inside an input to edit it */}
          {editMode && categoryId === category._id ? (
            <TextField
              className="mx-2"
              type="text"
              name="category"
              value={categoryName}
              autoFocus
              onChange={(e) => onChange(e)}
            />
          ) : (
            //* else will render the value
            category.category
          )}
        </td>
        {/* //! actions edit/delete */}
        <td style={{ width: "40%" }} className="align-middle">
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
