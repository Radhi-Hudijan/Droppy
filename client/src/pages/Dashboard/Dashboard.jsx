import React, { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import DashboardActive from "./DashboardActive";
import DashboardAvailable from "./DashboardAvailable";

function Dashboard() {
  const navigate = useNavigate();
  const [isDriver, setIsDriver] = useState(false);
  const [isClickedToAvailable, setIsClickedToAvailable] = useState(true);

  useEffect(() => {
    setIsDriver(localStorage.getItem("isDriver"));
    if (localStorage.getItem("isDriver") === "true") {
      getAvailableJobsHandler();
    } else {
      getActiveJobsHandler();
    }
  }, []);

  function getAvailableJobsHandler() {
    setIsClickedToAvailable(true);
  }

  function getActiveJobsHandler() {
    setIsClickedToAvailable(false);
  }

  function createJobHandler() {
    navigate("/jobs/create", {
      replace: true,
    });
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.buttonsAndCardsDiv}>
          <div className={style.buttonsDiv}>
            <div className={style.buttonDiv}>
              <button
                className={
                  isClickedToAvailable
                    ? `${style.button} ${style.buttonOutline}`
                    : `${style.button}`
                }
                onClick={
                  isDriver === "true"
                    ? getAvailableJobsHandler
                    : getActiveJobsHandler
                }
              >
                {isDriver === "true" ? "Available" : "Active"}
              </button>
            </div>
            <div className={style.buttonDiv}>
              <button
                className={
                  isClickedToAvailable
                    ? `${style.button}`
                    : `${style.button} ${style.buttonOutline}`
                }
                onClick={
                  isDriver === "true" ? getActiveJobsHandler : createJobHandler
                }
              >
                {isDriver === "true" ? "Active" : "New"}
              </button>
            </div>
          </div>
          {isClickedToAvailable ? <DashboardAvailable /> : <DashboardActive />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
