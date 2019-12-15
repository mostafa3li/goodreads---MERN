import React from "react";

// components
import Tabs from "./Tabs";

const AdminDashboard = () => {
  return (
    <main>
      <section>
        <h3 className="my-3 text-center">Admin Dashboard</h3>
        <Tabs />
      </section>
    </main>
  );
};

export default AdminDashboard;
