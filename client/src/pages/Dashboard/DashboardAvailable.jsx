import React, { useContext, useEffect, useState } from "react";
import JobCard from "./JobCard";
import useFetch from "../../hooks/useFetch";
import style from "./Dashboard.module.css";
import Pagination from "./Pagination";
import QueriesContext from "../../context/QueriesContext";
import objectToQueryParam from "../../util/objectToQueryParam";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";

function DashboardAvailable() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const { queries } = useContext(QueriesContext);
  const [urlQuery, setUrlQuery] = useState("");

  useEffect(() => {
    const query = objectToQueryParam(queries);
    setUrlQuery(query);
  }, [queries]);

  const onSuccess = (onReceived) => {
    setJobs(onReceived);
    setPageCount(onReceived?.result?.pagination.pageCount);
  };

  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    `/jobs?page=${page}${urlQuery}`,
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
  }, [page, urlQuery]);

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
      {isLoading && <Loading />}
      {error != null && <Error error={error} />}
    </>
  );
}

export default DashboardAvailable;
