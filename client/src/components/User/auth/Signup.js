import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";

// actions
import { userRegister } from "../../../redux/actions/users";

// Components
import Login from "./Login";

const HomeBanner = ({
  userRegister,
  users: { isAuthenticated, user, error }
}) => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const [userImage, setUserImage] = useState("");

  const onImageChange = (e) => setUserImage(e.target.files[0]);

  const onSubmit = (data) => {
    const { fName, lName, email, password } = data;
    if (email !== formData.email) {
      userRegister({ fName, lName, email, password }, userImage);
      setFormData({ ...formData, email: data.email });
    }
  };

  const validationSchema = Yup.object({
    fName: Yup.string().required("* required"),
    lName: Yup.string().required("* required"),
    email: Yup.string()
      .email("Please Provide a Valid Email")
      .required("* required"),
    password: Yup.string().required("* required"),
    passwordConfirm: Yup.string()
      .required("* required")
      .oneOf([Yup.ref("password"), null], "* Passwords must match")
  });

  // if (user || (error && error.status === 404)) {
  if (user && !isAuthenticated) {
    return <Login userEmail={user.email} />;
  }

  return (
    <Fragment>
      <h4>New here? Create a free account!</h4>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit(data);
          setSubmitting(false);
          if (!error.status === 406) {
            resetForm();
          }
        }}
      >
        {({ values, isSubmitting, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              {/* //! First Name */}
              <div className="col-6">
                <Field
                  name="fName"
                  type="text"
                  value={values.fName}
                  label="First Name"
                  variant="outlined"
                  as={TextField}
                  error={errors.fName && touched.fName}
                  helperText={errors.fName && touched.fName && errors.fName}
                  className="w-100"
                />
              </div>
              {/* //! Last Name */}
              <div className="col-6">
                <Field
                  name="lName"
                  type="text"
                  value={values.lName}
                  label="Last Name"
                  variant="outlined"
                  as={TextField}
                  error={errors.lName && touched.lName}
                  helperText={errors.lName && touched.lName && errors.lName}
                  className="w-100"
                />
              </div>
            </div>
            {/* //! Email */}
            <div className="form-group">
              <Field
                name="email"
                type="email"
                value={values.email}
                label="Email"
                variant="outlined"
                as={TextField}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
                className="w-100"
              />
            </div>
            {/* //! Password */}
            <div className="form-group">
              <Field
                name="password"
                type="password"
                value={values.password}
                label="Password"
                variant="outlined"
                as={TextField}
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
                className="w-100"
              />
            </div>
            {/* //! Password Confirmation */}
            <div className="form-group">
              <Field
                name="passwordConfirm"
                type="password"
                value={values.passwordConfirm}
                label="Confirm Password"
                variant="outlined"
                as={TextField}
                error={errors.passwordConfirm && touched.passwordConfirm}
                helperText={
                  errors.passwordConfirm &&
                  touched.passwordConfirm &&
                  errors.passwordConfirm
                }
                className="w-100"
              />
            </div>
            <div className={userImage ? "form-group row" : "form-group"}>
              <input
                multiple
                type="file"
                id="upload_userImage"
                onChange={(e) => onImageChange(e)}
                style={{ width: "0" }}
              />
              <label
                htmlFor="upload_userImage"
                className={userImage ? "col-10" : "w-100"}
              >
                <Button
                  component="span"
                  variant="contained"
                  className="w-100"
                  style={{ minHeight: "56px" }}
                >
                  {(userImage && userImage.name) || "Upload Your Image"}
                </Button>
              </label>
              <Thumb file={userImage} />
            </div>
            <div>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
              >
                sign up
              </Button>
              <small className="text-muted d-block mt-1">
                By clicking “Sign up” I agree to the Goodreads Terms of Service
                and confirm that I am at least 13 years old.
              </small>
            </div>
            {/* <br />
            <pre className="text-left">{JSON.stringify(values, null, 2)}</pre> */}
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

HomeBanner.propTypes = { users: PropTypes.object };

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, { userRegister })(HomeBanner);

//===================================================

const Thumb = (props) => {
  const [thumb, setThumb] = useState(undefined);

  const loadImage = () => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setThumb(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { file } = props;

  if (!file) {
    return null;
  }

  loadImage();

  return (
    <div className="col-2">
      <img
        src={thumb}
        alt={file.name}
        className="img-thumbnail w-100"
        width="56"
        height="56"
        style={{ maxHeight: "56px" }}
      />
    </div>
  );
};
