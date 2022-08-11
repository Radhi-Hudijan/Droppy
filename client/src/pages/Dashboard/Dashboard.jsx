import React, { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";
import useFetch from "../../hooks/useFetch";
import style from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [isDriver, setIsDriver] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isClickedToAvailable, setIsClickedToAvailable] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setIsDriver(localStorage.getItem("isDriver"));
  }, []);

  const onSuccess = (onReceived) => {
    setJobs(onReceived);
    setPageCount(jobs.result?.pagination.pageCount);
    // console.log(jobs.result?.pagination.pageCount, page)
  };

  const { performFetch, cancelFetch } = useFetch(
    `/jobs?page=${page}`,
    onSuccess
  );

  function getAvailableJobsHandler() {
    setIsClickedToAvailable(true);
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
  }
  useEffect(() => {
    if (localStorage.getItem("isDriver") === "true") {
      getAvailableJobsHandler();
    } else {
      getActiveJobsHandler();
    }
    return cancelFetch;
  }, [page]);

  const userID = localStorage.getItem("userID");

  function getActiveJobsHandler() {
    setIsClickedToAvailable(false);
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userID }),
    });
  }

  function createJobHandler() {
    navigate("/jobs/create", {
      replace: true,
    });
  }

  function handlePrevious() {
    if (page === 1) return page;
    setPage((page) => page - 1);
  }

  function handleNext() {
    if (page <= pageCount) return page;
    setPage((page) => page + 1);
  }

  return (
    <>
      <div className={style.container}>
        {isDriver === "true" ? (
          <div className={style.buttonsAndCardsDiv}>
            <div className={style.buttonsDiv}>
              <div className={style.buttonDiv}>
                <button
                  className={
                    isClickedToAvailable
                      ? `${style.button} ${style.buttonOutline}`
                      : `${style.button}`
                  }
                  onClick={getAvailableJobsHandler}
                >
                  Available
                </button>
              </div>
              <div className={style.buttonDiv}>
                <button
                  className={
                    isClickedToAvailable
                      ? `${style.button}`
                      : `${style.button} ${style.buttonOutline}`
                  }
                  onClick={getActiveJobsHandler}
                >
                  Active
                </button>
              </div>
            </div>
            <div className={style.cardsDiv}>
              <ul>
                {jobs ? (
                  jobs.result?.jobs?.map((job, index) => (
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
                  className={
                    isClickedToAvailable
                      ? `${style.button} ${style.buttonOutline}`
                      : `${style.button}`
                  }
                  onClick={getActiveJobsHandler}
                >
                  Active
                </button>
              </div>
              <div className={style.buttonDiv}>
                <button
                  className={
                    isClickedToAvailable
                      ? `${style.button}`
                      : `${style.button} ${style.buttonOutline}`
                  }
                  onClick={createJobHandler}
                >
                  New
                </button>
              </div>
            </div>
            <div className={style.cardsDiv}>
              <ul>
                {jobs ? (
                  jobs.result?.activeJobs?.map((job, index) => (
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
        <div className={style.pagination}>
          <button disabled={page === 1} onClick={handlePrevious}>
            Previous
          </button>

          <select
            value={page}
            onChange={(e) => {
              setPage(e.target.value);
            }}
          >
            {Array(pageCount)
              .fill(null)
              .map((_, index) => {
                return <option key={index}>{index + 1}</option>;
              })}
          </select>
          <button
            disabled={page === pageCount || pageCount === 1}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
