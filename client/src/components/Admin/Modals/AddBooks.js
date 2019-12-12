import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

// actions
import { addBook } from "../../../actions/books";

const AddBooks = ({ addBook, books, categories, authors, ...props }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    author: ""
  });
  const [bookImage, setBookImage] = useState("");

  const { name, category, author } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onImageChange = (e) => setBookImage(e.target.files[0]);

  const onSubmit = (e) => {
    e.preventDefault();
    addBook(formData, bookImage);
    if (name && category && author !== "") {
      props.onHide();
      setFormData({ name: "", category: "", author: "" });
      setBookImage("");
    }
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body className="row">
          <form
            onSubmit={(e) => onSubmit(e)}
            className="col-8 mx-auto text-center"
          >
            <div className="row justify-content-around form-group">
              {/* //! Book Name */}
              <div className="col-6">
                <TextField
                  label="Book Name"
                  variant="outlined"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </div>
              {/* //! Category name */}
              <div className="col-6">
                <FormControl
                  variant="outlined"
                  className="w-100"
                  disabled={categories && categories.length > 0 ? false : true}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Category Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    name="category"
                    value={category}
                    onChange={(e) => onChange(e)}
                    labelWidth={113}
                  >
                    {categories &&
                      categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.category}
                        </MenuItem>
                      ))}
                  </Select>
                  {categories.length === 0 && (
                    <FormHelperText>
                      Disabled - No Categories Exist
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
            <div className="row justify-content-around form-group">
              {/* //! Author name */}
              <div className="col-6">
                <FormControl
                  variant="outlined"
                  className="w-100"
                  disabled={authors && authors.length > 0 ? false : true}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Author Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    name="author"
                    value={author}
                    onChange={(e) => onChange(e)}
                    labelWidth={95}
                  >
                    {authors &&
                      authors.map((author) => (
                        <MenuItem key={author._id} value={author._id}>
                          {author.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {authors.length === 0 && (
                    <FormHelperText>Disabled - No Authors Exist</FormHelperText>
                  )}
                </FormControl>
              </div>
              {/* //! book image */}
              <div className="col-6">
                <FormControl>
                  <InputLabel shrink>Book Image</InputLabel>
                  <FilledInput
                    type="file"
                    multiple
                    onChange={(e) => onImageChange(e)}
                  />
                </FormControl>
              </div>
            </div>
            <div className="mt-3">
              <FormControl>
                <input
                  type="submit"
                  value="add"
                  className="btn btn-secondary"
                />
              </FormControl>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

AddBooks.propTypes = {
  books: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  addBook: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  books: state.books.books,
  categories: state.categories.categories,
  authors: state.authors.authors
});

export default connect(mapStateToProps, { addBook })(AddBooks);
