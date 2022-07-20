import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import JobView from "./JobView";

const CreateJobController = () => {
  const [jobData, setJobData] = useState({});
  const {
    item,
    description,
    fromPostCode,
    toPostCode,
    width,
    height,
    length,
    date,
    phoneNo,
  } = jobData;
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/Dashboard", {
      replace: true,
    });
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/job/create",
    onSuccess
  );

  useEffect(() => {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        item,
        description,
        fromPostCode,
        toPostCode,
        width,
        height,
        length,
        date,
        phoneNo,
      }),
    });
    return cancelFetch;
  }, [jobData]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>There is an error as following:{error}</div>;
  }
  return (
    <div>
      <JobView setJobData={setJobData} />
    </div>
  );
};

export default CreateJobController;
