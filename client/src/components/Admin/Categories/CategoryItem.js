import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";

// actions
import {
  deleteCategory,
  editCategory
} from "../../../redux/actions/categories";

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
  ) : categories.length <= 0 ? (
    <tr>
      <td colSpan="3">
        <h1>Your Library Has No Categories Yet!</h1>
      </td>
    </tr>
  ) : (
    categories &&
    categories.map((category) => (
      <tr key={category._id}>
        {/* //! ID */}
        <td style={{ width: "25%" }} className="align-middle">
          {category._id.substr(-5)}
        </td>
        {/* //! Category, edit category */}
        <td className="text-capitalize align-middle" style={{ width: "50%" }}>
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
        {/* //! actions edit/delete , submit/cancel edit */}
        <td style={{ width: "25%" }} className="align-middle overflow-hidden">
          <div className="row">
            {editMode && categoryId === category._id ? (
              <div className="col-lg-6 my-1 align-self-center">
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
              </div>
            ) : (
              <div className="col-lg-6 my-1">
                <button
                  className="btn btn-info w-100"
                  onClick={() => onEditHandler(category.category, category._id)}
                >
                  Edit
                </button>
              </div>
            )}
            <div className="col-lg-6 my-1">
              <button
                className="btn btn-danger w-100"
                onClick={() => deleteCategory(category._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </td>
      </tr>
    ))
  );
};

CategoryItem.propTypes = {
  categories: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(mapStateToProps, { deleteCategory, editCategory })(
  CategoryItem
);
