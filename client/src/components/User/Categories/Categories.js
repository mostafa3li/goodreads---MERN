import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@material-ui/core";

// actions
import { getCategories } from "../../../redux/actions/categories";

// layout
import Spinner from "../../layout/Spinner";
import PaginationButtons from "../../layout/Pagination";

const Categories = ({
  getCategories,
  categories: { categories, loading, categoriesCount }
}) => {
  const [params] = useState({
    limit: 16,
    skip: 0,
    sortBy: "category"
  });

  useEffect(() => {
    getCategories(params);
  }, [getCategories, params]);

  const changePageHandler = (page) => {
    const { limit } = params;
    const skip = page * limit - limit;
    getCategories({ ...params, skip });
  };

  return (
    <main className="container categories">
      <h2>Categories</h2>

      <section className="main-padding">
        <div className="row">
          {loading ? (
            <Spinner />
          ) : (
            (categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <div key={category._id} className="col-sm-6 col-md-4 col-lg-3">
                  <Link
                    to={`/categories/${category._id}`}
                    className="text-capitalize"
                  >
                    <Card className="each-category text-center">
                      <CardContent>
                        <Typography className="text-truncate">
                          {category.category}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))) || <h1>No Categories in the Library!</h1>
          )}
        </div>
        {categories && categoriesCount > params.limit && (
          <PaginationButtons
            pagesCount={Math.ceil(categoriesCount / params.limit)}
            changePageHandler={changePageHandler}
          />
        )}
      </section>
    </main>
  );
};

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  categoriesCount: PropTypes.number
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(mapStateToProps, { getCategories })(Categories);
