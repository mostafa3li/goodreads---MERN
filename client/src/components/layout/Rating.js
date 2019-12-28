import React from "react";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
// import Tooltip from "@material-ui/core/Tooltip";
// import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const BookRating = (props) => {
  const [value, setValue] = React.useState(2);
  return (
    <Box component="fieldset" borderColor="transparent">
      {/* <Typography component="legend">Controlled</Typography> */}
      <Rating
        name={props.readOnly ? "read-only" : "simple-controlled"}
        disabled={props.disabled ? true : false}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
};
export default BookRating;
