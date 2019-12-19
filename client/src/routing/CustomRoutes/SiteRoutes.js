import React, { Fragment } from "react";

// Custom Routes
import PrivateRoute from "./PrivateRoute";

// User Components
import Categories from "../../components/User/Categories/Categories";
import Books from "../../components/User/Books/Books";
import Authors from "../../components/User/Authors/Authors";

const AllRoutes = () => {
  return (
    <Fragment>
      <PrivateRoute exact path="/categories" component={Categories} />
      <PrivateRoute exact path="/books" component={Books} />
      <PrivateRoute exact path="/authors" component={Authors} />
    </Fragment>
  );
};

export default AllRoutes;
