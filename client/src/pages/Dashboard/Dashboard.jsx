import React, { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";

function Dashboard() {
  const [isDriver, setIsDriver] = useState(false);

  useEffect(() => {
    setIsDriver(localStorage.getItem("isDriver"));
  }, []);
  // check if it's driver from local storage isDriver: "true"/"false"
  // fetch all jobs and pagination
  // two tabs: available and active

  const job = {
    item: "Couch",
    fromPostCode: "1234 DT",
    toPostCode: "4321TD",
    date: "12-12-2022",
    width: 23,
    height: 21,
    length: 54,
  };
  return (
    <>
      {isDriver === "true" ? (
        <div>
          <JobCard job={job} />
        </div>
      ) : (
        <div>
          <JobCard job={job} />
        </div>
      )}
    </>
  );
}

export default Dashboard;
