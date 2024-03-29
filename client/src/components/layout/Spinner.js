import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: "200px",
        margin: "auto",
        display: "block",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)"
      }}
      alt="Loading..."
    />
  </Fragment>
);
