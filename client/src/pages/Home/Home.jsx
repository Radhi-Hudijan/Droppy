import React from "react";
import TEST_ID from "./Home.testid";
import style from "./Home.module.css";
import logo from "../../assets/droppy-logo.svg";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <div className={style.homePage}>
        <div className={style.logo}>
          <img src={logo} />
        </div>
        <button className={style.button}>GET STARTED</button>
        <p className={style.statement - "body-desktop"}>
          {"You don't need a car to carry your stuff,<br></br>You need Droppy!"}
        </p>
        <div>Already have an account? Log in here</div>
      </div>
    </div>
  );
};

export default Home;
