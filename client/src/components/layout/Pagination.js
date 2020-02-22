import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function PaginationButtons(props) {
  const classes = useStyles();
  const { pagesCount, changePageHandler } = props;

  return (
    <div className="text-center my-3">
      <div className={(classes.root, "d-inline-block")}>
        <Pagination
          count={pagesCount}
          showFirstButton
          showLastButton
          variant="outlined"
          color="secondary"
          onChange={(e, page) => changePageHandler(page)}
        />
      </div>
    </div>
  );
}
