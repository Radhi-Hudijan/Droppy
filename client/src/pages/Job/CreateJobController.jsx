import React, { useState, useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import JobView from "./JobView";
import UserInfoContext from "../../context/UserInfoContext";

const CreateJobController = () => {
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({});
  const { email } = useContext(UserInfoContext);
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

  const onSuccess = () => {
    navigate("/", {
      replace: true,
    });
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/job/create",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const jobHandler = () => {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        job: {
          sender: email,
          item,
          description,
          fromPostCode,
          toPostCode,
          width,
          height,
          length,
          date,
          phoneNo,
        },
      }),
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>There is an error as following:{error}</div>;
  }

  return (
    <div>
      <JobView setJobData={setJobData} jobHandler={jobHandler} />
    </div>
  );
};

export default CreateJobController;
