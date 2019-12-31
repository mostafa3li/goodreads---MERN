import React from "react";
import { connect } from "react-redux";

// layout
import AdminTabs from "../layout/AdminTabs";
import Spinner from "../layout/Spinner";

const AdminDashboard = ({ users: { user } }) => {
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
  users: state.users
});

export default connect(mapStateToProps)(AdminDashboard);
