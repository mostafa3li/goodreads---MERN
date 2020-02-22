import React, { useEffect } from "react";
import { connect } from "react-redux";

// layout
import AdminTabs from "../layout/AdminTabs";
import Spinner from "../layout/Spinner";

// actions
import { getAllCategories } from "../../redux/actions/categories";
import { getAllAuthors } from "../../redux/actions/authors";

const AdminDashboard = ({
  getAllCategories,
  getAllAuthors,
  users: { user }
}) => {
  useEffect(() => {
    getAllCategories();
    getAllAuthors();
  }, [getAllCategories, getAllAuthors]);

  return (
    <main>
      <section>
        <h3 className="my-3 text-center">Admin Dashboard</h3>
        {!user ? <Spinner /> : <AdminTabs />}
      </section>
    </main>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  books: state.allBooks
});

export default connect(mapStateToProps, { getAllCategories, getAllAuthors })(
  AdminDashboard
);
