import React, { Fragment } from "react";

// Custom Routes
import PrivateRoute from "./PrivateRoute";

// User Components
import Categories from "../../components/User/Categories/Categories";
import CategoryItem from "../../components/User/Categories/CategoryItem";
import Books from "../../components/User/Books/Books";
import BookPage from "../../components/User/Books/BookPage";
import Authors from "../../components/User/Authors/Authors";
import AuthorPage from "../../components/User/Authors/AuthorPage";

const AllRoutes = () => {
  return (
    <Fragment>
      <PrivateRoute exact path="/categories" component={Categories} />
      <PrivateRoute exact path="/categories/:id" component={CategoryItem} />
      <PrivateRoute exact path="/books" component={Books} />
      <PrivateRoute exact path="/books/:id" component={BookPage} />
      <PrivateRoute exact path="/authors" component={Authors} />
      <PrivateRoute exact path="/authors/:id" component={AuthorPage} />
    </Fragment>
  );
};

export default AllRoutes;
