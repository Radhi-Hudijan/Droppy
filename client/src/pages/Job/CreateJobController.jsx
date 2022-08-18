import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import JobView from "./JobView";
import Error from "../../components/Error/Error";

const CreateJobController = () => {
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/dashboard", {
      replace: true,
    });
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/jobs/create",
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
        job: { senderID: localStorage.getItem("userID"), ...inputs },
      }),
    });
  };

  return (
    <div>
      <JobView jobHandler={jobHandler} />
      {isLoading && <Loading />}
      {error != null && <Error error={error} />}
    </div>
  );
};

export default CreateJobController;
