import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

// actions
import { addCategory } from "../../../actions/categories";

const AddCategories = ({ addCategory, error, ...props }) => {
  const [category, setCategory] = useState("");

  const onChange = (e) => {
    setCategory(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addCategory(category);
    if (category !== "") {
      //! add (getCategory) to compare
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
            className="col-6 mx-auto text-center"
          >
            <div>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-category">
                  Category
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-category"
                  type="text"
                  name="category"
                  value={category}
                  labelWidth={65}
                  autoFocus
                  onChange={(e) => onChange(e)}
                />
              </FormControl>
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

const mapStateToProps = (state) => ({
  error: state.categories.error
});

export default connect(mapStateToProps, { addCategory })(AddCategories);
