import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

// actions
import {
  deleteBook,
  editBook,
  addBookImage
} from "../../../redux/actions/books";

// layout
import Spinner from "../../layout/Spinner";

const BookItem = ({
  deleteBook,
  editBook,
  addBookImage,
  books: { books, loading },
  categories,
  authors
}) => {
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    authorId: ""
  });
  const [bookImage, setBookImage] = useState("");
  const [bookId, setBookId] = useState("");
  const [editMode, setEditMode] = useState(false);

  const onEditHandler = (oldName, oldCategory, oldAuthor, id) => {
    setBookId(id);
    setFormData({
      ...formData,
      name: oldName,
      categoryId: oldCategory._id,
      categoryName: oldCategory.category,
      authorId: oldAuthor._id,
      authorName: oldAuthor.name
    });
    setEditMode(true);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    setBookImage(e.target.files[0]);
  };

  const cancelEditHandler = () => {
    setBookId("");
    setBookImage("");
    setFormData({
      name: "",
      categoryId: "",
      categoryName: "",
      authorId: "",
      authorName: ""
    });
    setEditMode(false);
  };

  const submitEditHandler = (bookData) => {
    const { _id, oldName, oldCategoryId, oldAuthorId } = bookData;
    if (
      name !== oldName ||
      categoryId !== oldCategoryId ||
      authorId !== oldAuthorId
    ) {
      editBook(_id, formData);
    }
    if (bookImage !== "") {
      addBookImage(_id, bookImage);
    }
    cancelEditHandler();
  };

  const { name, categoryId, authorId } = formData;

  return loading ? (
    <tr>
      <td>
        <Spinner />
      </td>
    </tr>
  ) : books.length <= 0 ? (
    <tr>
      <td colSpan="6">
        <h1>Your Library Has No Books Yet!</h1>
      </td>
    </tr>
  ) : (
    books &&
    books.map((book) => (
      <tr key={book._id}>
        {/* //! ID */}
        <td style={{ width: "10%" }} className="align-middle">
          {book._id.substr(-5)}
        </td>
        {/* //! Book Photo, edit photo */}
        <td style={{ width: "15%" }} className="align-middle">
          {editMode && bookId === book._id ? (
            <Input type="file" multiple onChange={(e) => onImageChange(e)} />
          ) : book.hasPhoto ? (
            <img src={`/api/books/${book._id}/photo`} alt="book" width="100" />
          ) : (
            "N/A"
          )}
        </td>
        {/* //! Book, edit book */}
        <td style={{ width: "15%" }} className="text-capitalize align-middle">
          {editMode && bookId === book._id ? (
            <Fragment>
              <TextField
                onChange={(e) => onChange(e)}
                autoFocus
                name="name"
                value={name}
              />
            </Fragment>
          ) : (
            book.name
          )}
        </td>
        {/* //! Book's category, edit book's category */}
        <td style={{ width: "15%" }} className="text-capitalize align-middle">
          {editMode && bookId === book._id ? (
            <FormControl className="w-100">
              <Select
                labelId="edit_category"
                name="categoryId"
                value={categoryId}
                onChange={(e) => onChange(e)}
                labelWidth={113}
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            (book.category && book.category.category) || "N/A"
          )}
        </td>
        {/* //! Book's author, edit book's author */}
        <td style={{ width: "15%" }} className="text-capitalize align-middle">
          {editMode && bookId === book._id ? (
            <FormControl className="w-100">
              <Select
                labelId="edit_author"
                name="authorId"
                value={authorId}
                onChange={(e) => onChange(e)}
                labelWidth={113}
              >
                {authors.map((author) => (
                  <MenuItem key={author._id} value={author._id}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            (book.author && book.author.name) || "N/A"
          )}
        </td>
        {/* //! actions edit/delete, submit/cancel edit */}
        <td style={{ width: "20%" }} className="text-capitalize align-middle">
          {editMode && bookId === book._id ? (
            <div className="mr-3 d-inline">
              <button title="Cancel" onClick={() => cancelEditHandler()}>
                &#10006;
              </button>
              <button
                title="Submit"
                onClick={() =>
                  submitEditHandler({
                    _id: book._id,
                    oldName: book.name,
                    oldCategoryId: book.category._id,
                    oldAuthorId: book.author._id
                  })
                }
              >
                &#10004;
              </button>
            </div>
          ) : (
            <button
              className="btn btn-info mx-2"
              onClick={() =>
                onEditHandler(book.name, book.category, book.author, book._id)
              }
            >
              Edit
            </button>
          )}
          <button
            className="btn btn-danger mx-2"
            onClick={() => deleteBook(book._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  );
};

BookItem.propTypes = {
  books: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  deleteBook: PropTypes.func.isRequired,
  editBook: PropTypes.func.isRequired,
  addBookImage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  books: state.books,
  categories: state.categories.categories,
  authors: state.authors.authors
});

export default connect(mapStateToProps, { deleteBook, editBook, addBookImage })(
  BookItem
);
