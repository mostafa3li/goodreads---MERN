import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

// actions
import { addCategory } from "../../../redux/actions/categories";

const AddCategories = ({ addCategory, ...props }) => {
  const [category, setCategory] = useState("");

  const onChange = (e) => setCategory(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    addCategory(category);
    if (category !== "") {
      props.onHide();
      setCategory("");
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
          <Modal.Title id="contained-modal-title-vcenter">
            Add Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="row">
          <form
            onSubmit={(e) => onSubmit(e)}
            className="col-8 mx-auto text-center"
          >
            <div className="col-lg-6 offset-lg-3 form-group">
              {/* //! Category Name */}
              <FormControl variant="outlined" className="w-100">
                <InputLabel htmlFor="outlined-adornment-category">
                  Category Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-category"
                  type="text"
                  name="category"
                  value={category}
                  labelWidth={113}
                  autoFocus
                  onChange={(e) => onChange(e)}
                />
              </FormControl>
            </div>
            <div>
              <FormControl>
                <input
                  type="submit"
                  value="Add Category"
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

AddCategories.propTypes = {
  addCategory: PropTypes.func.isRequired
};

export default connect(null, { addCategory })(AddCategories);
