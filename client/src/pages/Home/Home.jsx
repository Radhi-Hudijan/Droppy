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
import CountUp from "react-countup";

import { FaUser, FaCar, FaClipboardCheck } from "react-icons/fa";

const Home = () => {
  const [totalJobAmount, setTotalJobAmount] = useState();
  const [sendersAmount, setSendersAmount] = useState();
  const [deliverersAmount, setDeliverersAmount] = useState();

  const onSuccess = (onReceived) => {
    setTotalJobAmount(onReceived.result.numOfTotalJobs);
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
        <div className={style.singleButton}>
          <Button path="/user/create">GET STARTED</Button>
        </div>

        <div className={appStyle.bodyDesktop}>
          Already have an account? <Link to="/login">Log in</Link>
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
        <div className={style.statContainer}>
          <div className={style.row}>
            <div className={style.col}>
              <FaClipboardCheck className={style.statIcon} />
              <div className={style.counter}>
                <CountUp end={totalJobAmount} className={appStyle.h2Desktop} />
                <div className={style.statsLine}></div>
                <p className={`${appStyle.h2Desktop} ${style.statsText}`}>
                  Jobs
                </p>
              </div>
            </div>
            <div className={style.col}>
              <FaUser className={style.statIcon} />
              <div className={style.counter}>
                <CountUp
                  end={sendersAmount + deliverersAmount}
                  className={appStyle.h2Desktop}
                />
                <div className={style.statsLine}></div>
                <p className={`${appStyle.h2Desktop} ${style.statsText}`}>
                  Users
                </p>
              </div>
            </div>
            <div className={style.col}>
              <FaCar className={style.statIcon} />
              <div className={style.counter}>
                <CountUp
                  end={deliverersAmount}
                  className={appStyle.h2Desktop}
                />
                <div className={style.statsLine}></div>
                <p className={`${appStyle.h2Desktop} ${style.statsText}`}>
                  Drivers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
