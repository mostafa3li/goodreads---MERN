import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";

// actions
import {
  deleteAuthor,
  editAuthor,
  addAuthorImage
} from "../../../redux/actions/authors";

// layout
import Spinner from "../../layout/Spinner";

const AuthorItem = ({
  deleteAuthor,
  editAuthor,
  addAuthorImage,
  authors: { authors, loading }
}) => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    birthDate: ""
  });
  const [authorImage, setAuthorImage] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [editMode, setEditMode] = useState(false);

  const onEditHandler = (oldFName, oldLName, oldBirthDate, id) => {
    setAuthorId(id);
    setFormData({
      ...formData,
      fName: oldFName,
      lName: oldLName,
      birthDate: oldBirthDate.slice(0, 10)
    });
    setEditMode(true);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    setAuthorImage(e.target.files[0]);
  };

  const cancelEditHandler = () => {
    setAuthorId("");
    setAuthorImage("");
    setFormData({ fName: "", lName: "", birthDate: "" });
    setEditMode(false);
  };

  const submitEditHandler = (authorData) => {
    const { _id, oldFName, oldLName, oldBirthDate } = authorData;
    if (
      fName !== oldFName ||
      lName !== oldLName ||
      birthDate !== oldBirthDate
    ) {
      editAuthor(_id, formData);
    }
    if (authorImage !== "") {
      addAuthorImage(_id, authorImage);
    }
    cancelEditHandler();
  };

  const { fName, lName, birthDate } = formData;

  return loading ? (
    <tr>
      <td>
        <Spinner />
      </td>
    </tr>
  ) : authors.length <= 0 ? (
    <tr>
      <td colSpan="6">
        <h1>Your Library Has No Authors Yet!</h1>
      </td>
    </tr>
  ) : (
    authors &&
    authors.map((author) => {
      const firstName =
        author.name.split(" ").length === 1
          ? author.name
          : author.name.split(" ").slice(0, -1)[0];

      const lastName =
        author.name.split(" ").length > 1
          ? author.name.split(" ").slice(-1)[0]
          : "---";

      return (
        <tr key={author._id}>
          {/* //! ID */}
          <td style={{ width: "10%" }} className="align-middle">
            {author._id.substr(-5)}
          </td>
          {/* //! Author Photo, edit photo */}
          <td style={{ width: "15%" }} className="align-middle">
            {editMode && authorId === author._id ? (
              <Input type="file" multiple onChange={(e) => onImageChange(e)} />
            ) : author.hasAvatar ? (
              <img
                src={`/api/authors/${author._id}/avatar`}
                alt="author"
                width="100"
              />
            ) : (
              "N/A"
            )}
          </td>
          {/* //! First Name, edit first name */}
          <td style={{ width: "15%" }} className="text-capitalize align-middle">
            {editMode && authorId === author._id ? (
              <Fragment>
                <TextField
                  onChange={(e) => onChange(e)}
                  autoFocus
                  name="fName"
                  value={fName}
                />
              </Fragment>
            ) : (
              firstName
            )}
          </td>
          {/* //! Last Name, edit last name */}
          <td style={{ width: "15%" }} className="text-capitalize align-middle">
            {editMode && authorId === author._id ? (
              <Fragment>
                <TextField
                  onChange={(e) => onChange(e)}
                  name="lName"
                  value={lName}
                />
              </Fragment>
            ) : (
              lastName
            )}
          </td>
          {/* //! Date of Birth, edit date of birth */}
          <td style={{ width: "20%" }} className="align-middle">
            {editMode && authorId === author._id ? (
              <Input
                type="date"
                name="birthDate"
                value={birthDate}
                onChange={(e) => onChange(e)}
              />
            ) : (
              <Moment format="YYYY-MM-DD">{author.birthDate}</Moment>
            )}
          </td>
          {/* //! actions edit/delete, submit/cancel edit */}
          <td style={{ width: "20%" }} className="align-middle">
            {editMode && authorId === author._id ? (
              <div className="mr-3 d-inline">
                <button title="Cancel" onClick={() => cancelEditHandler()}>
                  &#10006;
                </button>
                <button
                  title="Submit"
                  onClick={() =>
                    submitEditHandler({
                      _id: author._id,
                      oldFName: firstName,
                      oldLName: lastName,
                      oldBirthDate: author.birthDate.slice(0, 10)
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
                  onEditHandler(
                    firstName,
                    lastName,
                    author.birthDate,
                    author._id
                  )
                }
              >
                Edit
              </button>
            )}
            <button
              className="btn btn-danger mx-2"
              onClick={() => deleteAuthor(author._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    })
  );
};

AuthorItem.propTypes = {
  authors: PropTypes.object.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  editAuthor: PropTypes.func.isRequired,
  addAuthorImage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authors: state.authors
});

export default connect(mapStateToProps, {
  deleteAuthor,
  editAuthor,
  addAuthorImage
})(AuthorItem);
