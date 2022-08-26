import React, { useEffect, useState } from "react";
import TEST_ID from "./Home.testid";

// Style
import style from "./Home.module.css";
import appStyle from "../../App.module.css";

import InformationCard from "./InformationCard";
// Icons
import truck from "../../assets/icons/truck-icon.svg";
import carry from "../../assets/icons/carry-icon.svg";
import plus from "../../assets/icons/plus-icon.svg";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
// Graph
import DemoPie from "../../components/Graphs/pieChart";
import DemoBar from "../../components/Graphs/BarChart";

const Home = () => {
  const [availableJobAmount, setAvailableJobAmount] = useState();
  const [totalJobAmount, setTotalJobAmount] = useState();
  const [takenJobAmount, setTakenJobAmount] = useState();
  const [sendersAmount, setSendersAmount] = useState();
  const [deliverersAmount, setDeliverersAmount] = useState();

  const onSuccess = (onReceived) => {
    setAvailableJobAmount(onReceived.result.numOfAvailableJobs);
    setTotalJobAmount(onReceived.result.numOfTotalJobs);
    setTakenJobAmount(onReceived.result.numOfTakenJobs);
    setSendersAmount(onReceived.result.numOfSenders);
    setDeliverersAmount(onReceived.result.numOfDeliverers);
  };

  const { performFetch, cancelFetch } = useFetch("/graphs/values", onSuccess);

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return cancelFetch;
  }, []);

  return (
    <div data-testid={TEST_ID.container}>
      <div className={style.homePage}>
        <div className={style.logoContainer}>
          <Logo />
        </div>

        <p className={appStyle.h2Desktop}>
          Looking for help to move some stuff?
        </p>

        <Button path="/user/create">GET STARTED</Button>

        <div className={appStyle.bodyDesktop}>
          Already have an account? <Link to="/login">Log in here</Link>
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
        <div className={style.graphContainer}>
          <div className={style.graph}>
            <DemoBar senders={sendersAmount} deliverers={deliverersAmount} />
          </div>
          <div className={style.graph}>
            <DemoPie
              availableJobs={availableJobAmount}
              activeJobs={takenJobAmount}
              totalJobs={totalJobAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
