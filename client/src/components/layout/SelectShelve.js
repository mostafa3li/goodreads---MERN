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
  const {
    bookData: { bookId, category, author },
    bookShelve: { shelve }
  } = props;
  const [editMode, setEditMode] = useState(false);

  const onChange = (e) => {
    if (shelve !== e.target.value) {
      addBookShelve(e.target.value, { bookId, category, author });
    }
    setEditMode(false);
  };

  return (
    <Fragment>
      {shelve !== "no shelve" && !editMode ? (
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
            {shelve === "no shelve" && (
              <MenuItem value={"no shelve"} disabled>
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
