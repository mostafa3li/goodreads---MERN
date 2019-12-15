import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

// Components
import Categories from "./Categories/Categories";
import Authors from "./Authors/Authors";
import Books from "./Books/Books";

const DashboardTabs = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="categories"
        id="uncontrolled-tab-example"
        className="d-flex justify-content-center"
      >
        <Tab eventKey="categories" title="Categories">
          <Categories />
        </Tab>
        <Tab eventKey="books" title="Books">
          <Books />
        </Tab>
        <Tab eventKey="authors" title="Authors">
          <Authors />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
