import React, { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";
import useFetch from "../../hooks/useFetch";
import style from "./Dashboard.module.css";
import appStyle from "../../App.module.css";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const [isDriver, setIsDriver] = useState(false);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);

  useEffect(() => {
    setIsDriver(localStorage.getItem("isDriver"));
  }, []);

  const onSuccessAvailable = (onReceived) => {
    setAvailableJobs(onReceived);
  };
  const { performFetch, cancelFetch } = useFetch(
    "/job/available-jobs-for-deliverer",
    onSuccessAvailable
  );

  function getDelivererAvailableJobsHandler() {
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
  }
  useEffect(() => {
    getDelivererAvailableJobsHandler();
    return cancelFetch;
  }, []);

  const userID = localStorage.getItem("userID");

  function getActiveJobsHandler() {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userID }),
    });
  }

  function createJobHandler() {
    Navigate("/job/create", {
      replace: true,
    });
  }

  return (
    <>
      <div className={style.container}>
        {isDriver === "true" ? (
          <div className={style.buttonsAndCardsDiv}>
            <div className={style.buttonsDiv}>
              <div className={style.buttonDiv}>
                <button
                  className={`${style.button} ${style.buttonOutline}`}
                  onClick={getDelivererAvailableJobsHandler}
                >
                  Available
                </button>
              </div>
              <div className={style.buttonDiv}>
                <button
                  className={`${style.button}`}
                  onClick={getActiveJobsHandler}
                >
                  Active
                </button>
              </div>
            </div>
            <div className={style.cardsDiv}>
              <ul>
                {availableJobs ? (
                  availableJobs.result?.map((job, index) => (
                    <li key={index}>
                      <JobCard job={job} />
                    </li>
                  ))
                ) : (
                  <p> There is no available job</p>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className={style.buttonsAndCardsDiv}>
            <div className={style.buttonsDiv}>
              <div className={style.buttonDiv}>
                <button
                  className={`${style.button} ${style.buttonOutline}`}
                  onClick={getDelivererAvailableJobsHandler}
                >
                  Active
                </button>
              </div>
              <div className={style.buttonDiv}>
                <button
                  className={`${style.button}`}
                  onClick={createJobHandler}
                >
                  New
                </button>
              </div>
            </div>
            <div className={style.cardsDiv}>
              <ul>
                {availableJobs ? (
                  availableJobs.result?.map((job, index) => (
                    <li key={index}>
                      <JobCard job={job} />
                    </li>
                  ))
                ) : (
                  <p> There is no available job</p>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
