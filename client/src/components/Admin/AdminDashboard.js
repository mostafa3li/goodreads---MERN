import React from "react";

// layout
import AdminTabs from "../layout/AdminTabs";

const AdminDashboard = () => {
  return (
    <main>
      <section>
        <h3 className="my-3 text-center">Admin Dashboard</h3>
        <AdminTabs />
      </section>
    </main>
  );
};

export default AdminDashboard;
