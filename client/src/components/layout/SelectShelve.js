import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import CardActionArea from "@material-ui/core/CardActionArea";

// actions
import { addBookShelve } from "../../redux/actions/userBooks";

const SelectShelve = ({ addBookShelve, ...props }) => {
  const { bookId, shelve } = props;
  const [editMode, setEditMode] = useState(false);

  const onChange = (e) => {
    if (shelve !== e.target.value) {
      addBookShelve(e.target.value, bookId);
    }
    setEditMode(false);
  };

  return (
    <Fragment>
      {shelve !== "none" && !editMode ? (
        <div className="text-center">
          <h6>
            {(shelve === "want" && "Want to Read") ||
              (shelve === "currently" && "Currenly Reading") ||
              "Read"}
          </h6>
          <CardActionArea onClick={() => setEditMode(true)}>
            <EditIcon /> Edit Shelve
          </CardActionArea>
        </div>
      ) : (
        <FormControl className="w-100" variant="outlined">
          <Select
            labelId="add_shelve"
            name="bookShelve"
            value={shelve}
            onChange={(e) => onChange(e)}
            onClose={() => setEditMode(false)}
          >
            {shelve === "none" && (
              <MenuItem value={"none"} disabled>
                Select Shelve
              </MenuItem>
            )}
            <MenuItem value={"want"}>Want to Read</MenuItem>
            <MenuItem value={"currently"}>Currently Reading</MenuItem>
            <MenuItem value={"read"}>Read</MenuItem>
          </Select>
        </FormControl>
      )}
    </Fragment>
  );
};

SelectShelve.propTypes = {
  addBookShelve: PropTypes.func.isRequired
};

export default connect(null, { addBookShelve })(SelectShelve);
