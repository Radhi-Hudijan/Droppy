import React from "react";
import TEST_ID from "./Home.testid";

// Style
import style from "./Home.module.css";

import InformationCard from "./InformationCard";
// Icons
import truck from "../../assets/icons/truck-icon.svg";
import carry from "../../assets/icons/carry-icon.svg";
import plus from "../../assets/icons/plus-icon.svg";
import Button from "../../components/Button";
import Logo from "../../components/Logo";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <div className={style.homePage}>
        <Logo />

        <p className="body-desktop">Looking for help to move some stuff?</p>
        <Button path="/user/create">GET STARTED</Button>
        <div>
          Already have an account? <a href="">Log in here</a>
        </div>
        <div className={style.allCards}>
          <InformationCard
            src={truck}
            text={"Easy to use, Just post your item and wait for offers."}
          />
          <InformationCard
            src={carry}
            text={
              "If you ask nicely the driver may even help to carry your items."
            }
          />
          <InformationCard
            src={plus}
            text={"Add your car to your profile to sign up as a driver today!"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
