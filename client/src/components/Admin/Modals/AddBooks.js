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
import FormHelperText from "@material-ui/core/FormHelperText";

// actions
import { addBook } from "../../../redux/actions/books";

const AddBooks = ({
  addBook,
  books,
  categories: { allCategories },
  authors: { allAuthors },
  ...props
}) => {
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
            <div className="row justify-content-around">
              {/* //! Book Name */}
              <div className="col-lg-6 form-group">
                <FormControl className="w-100">
                  <TextField
                    label="Book Name"
                    variant="outlined"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                  />
                </FormControl>
              </div>
              {/* //! Category name */}
              <div className="col-lg-6 form-group">
                <FormControl
                  variant="outlined"
                  className="w-100"
                  disabled={
                    allCategories && allCategories.length > 0 ? false : true
                  }
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Category Name
                  </InputLabel>
                  <Select
                    native
                    labelId="demo-simple-select-outlined-label"
                    name="category"
                    value={category}
                    onChange={(e) => onChange(e)}
                    labelWidth={113}
                  >
                    <option value="" />
                    {allCategories &&
                      allCategories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.category}
                        </option>
                      ))}
                  </Select>
                  {allCategories.length === 0 && (
                    <FormHelperText>
                      Disabled - No Categories Exist
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
            <div className="row justify-content-around">
              {/* //! Author name */}
              <div className="col-lg-6 form-group">
                <FormControl
                  variant="outlined"
                  className="w-100"
                  disabled={allAuthors && allAuthors.length > 0 ? false : true}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Author Name
                  </InputLabel>
                  <Select
                    native
                    labelId="demo-simple-select-outlined-label"
                    name="author"
                    value={author}
                    onChange={(e) => onChange(e)}
                    labelWidth={95}
                  >
                    <option value="" />
                    {allAuthors &&
                      allAuthors.map((author) => (
                        <option key={author._id} value={author._id}>
                          {author.name}
                        </option>
                      ))}
                  </Select>
                  {allAuthors.length === 0 && (
                    <FormHelperText>Disabled - No Authors Exist</FormHelperText>
                  )}
                </FormControl>
              </div>
              {/* //! book image */}
              <div className="col-lg-6 form-group">
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
            <div>
              <FormControl>
                <input
                  type="submit"
                  value="Add Book"
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
  categories: PropTypes.object.isRequired,
  authors: PropTypes.object.isRequired,
  addBook: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  books: state.books.books,
  categories: state.categories,
  authors: state.authors
});

export default connect(mapStateToProps, { addBook })(AddBooks);
