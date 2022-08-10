import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import JobView from "./JobView";

const CreateJobController = () => {
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/dashboard", {
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

  const jobHandler = (inputs) => {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        job: { id: localStorage.getItem("id"), ...inputs },
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
      <JobView jobHandler={jobHandler} />
    </div>
  );
};

export default CreateJobController;
