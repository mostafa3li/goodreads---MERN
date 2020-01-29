import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import TextField from "@material-ui/core/TextField";

// actions
import { addAuthor } from "../../../redux/actions/authors";

const AddAuthors = ({ addAuthor, ...props }) => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    birthDate: ""
  });
  const [authorImage, setAuthorImage] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => setAuthorImage(e.target.files[0]);

  const onSubmit = (e) => {
    e.preventDefault();
    addAuthor(formData, authorImage);
    if (birthDate && (fName || lName) !== "") {
      props.onHide();
      setFormData({ fName: "", lName: "", birthDate: "" });
      setAuthorImage("");
    }
  };

  const { fName, lName, birthDate } = formData;

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
            <div className="row justify-content-around">
              {/* //! First Name */}
              <div className="col-lg-6 form-group">
                <FormControl className="w-100">
                  <TextField
                    onChange={(e) => onChange(e)}
                    label="First Name"
                    variant="outlined"
                    name="fName"
                    value={fName}
                  />
                </FormControl>
              </div>
              {/* //! Last Name */}
              <div className="col-lg-6 form-group">
                <FormControl className="w-100">
                  <TextField
                    onChange={(e) => onChange(e)}
                    label="Last Name"
                    variant="outlined"
                    name="lName"
                    value={lName}
                  />
                </FormControl>
              </div>
            </div>
            <div className="row justify-content-around">
              {/* //! Birthdate */}
              <div className="col-lg-6 form-group">
                <FormControl className="w-100">
                  <InputLabel shrink>Date of Birth</InputLabel>
                  <FilledInput
                    type="date"
                    label="Birth Date"
                    name="birthDate"
                    value={birthDate}
                    onChange={(e) => onChange(e)}
                  />
                </FormControl>
              </div>
              {/* //! Author Image */}
              <div className="col-lg-6 form-group">
                <FormControl>
                  <InputLabel shrink>Author Image</InputLabel>
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
                  value="Add Author"
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

AddAuthors.propTypes = {
  addAuthor: PropTypes.func.isRequired
};

export default connect(null, { addAuthor })(AddAuthors);
