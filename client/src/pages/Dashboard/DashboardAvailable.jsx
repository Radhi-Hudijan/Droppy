import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import useFetch from "../../hooks/useFetch";
import style from "./Dashboard.module.css";
import Pagination from "./Pagination";

function DashboardAvailable() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const onSuccess = (onReceived) => {
    setJobs(onReceived);
    setPageCount(onReceived?.result?.pagination.pageCount);
  };

  const { performFetch, cancelFetch } = useFetch(
    `/jobs?page=${page}`,
    onSuccess
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return cancelFetch;
  }, [page]);

  return (
    <>
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
      <Pagination page={page} pageCount={pageCount} setPage={setPage} />
    </>
  );
}

export default DashboardAvailable;