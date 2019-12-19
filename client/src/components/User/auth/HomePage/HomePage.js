import React, { Fragment, useState } from "react";

// Components
import HomeNavbar from "./HomeNavbar";
import Signup from "./Signup";
import Login from "./Login";

const Home = () => {
  const [loginForm, setLoginForm] = useState(false);

  const changeFormHandler = (e) => {
    e.preventDefault();
    setLoginForm(!loginForm);
  };

  return (
    <Fragment>
      <header className="home-header">
        <HomeNavbar
          loginFormStatus={loginForm}
          changeFormHandler={changeFormHandler}
        />
      </header>
      <main>
        <section className="home-banner">
          <div className="container">
            <div className="row">
              <div className="slogan"></div>
              <div className="col-md-6 offset-md-6 py-4">
                {(loginForm && <Login />) || <Signup />}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default Home;
