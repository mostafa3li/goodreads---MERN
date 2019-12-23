import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// actions
import { getCategories } from "../../../redux/actions/categories";

// layout
import Spinner from "../../layout/Spinner";
import { Card, CardContent, Typography } from "@material-ui/core";

const Categories = ({ getCategories, categories: { categories, loading } }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <main className="container categories">
      <h2>Categories</h2>
      <section className="main-padding">
        <div className="row">
          {loading ? (
            <Spinner />
          ) : (
            (categories.length > 0 &&
              categories.map((category) => (
                <div key={category._id} className="col-sm-6 col-md-4 col-lg-3">
                  <Link
                    to={`/categories/${category._id}`}
                    className="text-capitalize"
                  >
                    <Card className="each-category text-center">
                      <CardContent>
                        <Typography>{category.category}</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))) || <h1>No Categories in the Library!</h1>
          )}
        </div>
      </section>
    </main>
  );
};

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(mapStateToProps, { getCategories })(Categories);
