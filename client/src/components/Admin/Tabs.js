import React from "react";
import { Tabs, Tab } from "react-bootstrap";

// Components
import Categories from "./Categories/Categories";
import Authors from "./Authors/Authors";

const DashboardTabs = () => {
  return (
    <div>
      <Tabs defaultActiveKey="books" id="uncontrolled-tab-example">
        <Tab eventKey="categories" title="Categories">
          <Categories />
        </Tab>
        <Tab eventKey="books" title="Books">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
            illo aliquid magnam in cumque nostrum provident placeat veniam
            dolores molestiae, quibusdam minima voluptas commodi nulla.
            Voluptates architecto cumque suscipit quo?
          </p>
        </Tab>
        <Tab eventKey="authors" title="Authors">
          <Authors />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
