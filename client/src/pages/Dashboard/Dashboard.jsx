import React, { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";
import useFetch from "../../hooks/useFetch";

function Dashboard() {
  const [isDriver, setIsDriver] = useState(false);
  const [availableJobs, setAvailableJobs] = useState([]);

  useEffect(() => {
    setIsDriver(localStorage.getItem("isDriver"));
  }, []);
  // check if it's driver from local storage isDriver: "true"/"false"
  // fetch all jobs and pagination
  // two tabs: available and active

  // jobslari cagir
  const onSuccess = (onReceived) => {
    setAvailableJobs(onReceived);
    // console.log(onReceived);
  };
  const { performFetch, cancelFetch } = useFetch("/job", onSuccess);

  useEffect(() => {
    return cancelFetch;
  }, []);

  function getAvailableJobsHandler() {
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return (
    <>
      {/* <div>
        <div>
          <button>Available</button>
        </div>
        <div>
          <button>Active</button>
        </div>
      </div> */}

      <div>
        {isDriver === "true" ? (
          <div>
            <button onClick={getAvailableJobsHandler}>Available Jobs</button>
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
        ) : (
          <div>{/* <JobCard job={job} /> */}</div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
