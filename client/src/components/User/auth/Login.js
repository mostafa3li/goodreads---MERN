import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";

// actions
import { userLogin } from "../../../redux/actions/users";

const Login = ({ userLogin, error, ...props }) => {
  const [formData, setFormData] = useState({
    email: props.userEmail ? props.userEmail : "",
    password: ""
  });

  const onSubmit = (data) => {
    const { email, password } = formData;
    if (data.email !== email || data.password !== password) {
      userLogin(data);
      setFormData({ email: data.email, password: data.password });
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please Provide a Valid Email")
      .required("* required"),
    password: Yup.string().required("* required")
  });

  return (
    <Fragment>
      <h4>Already a User? Login!</h4>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit(data);
          setSubmitting(false);
          if (!error) {
            resetForm();
          }
        }}
      >
        {({ values, isSubmitting, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
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
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
            >
              sign in
            </Button>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

Login.propTypes = { error: PropTypes.object };

const mapStateToProps = (state) => ({
  error: state.users.error
});

export default connect(mapStateToProps, { userLogin })(Login);
