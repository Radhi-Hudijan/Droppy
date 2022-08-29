import React, { useEffect, useContext } from "react";
import AddCarForm from "./AddCarForm";
import useFetch from "../../hooks/useFetch";
import UserInfoContext from "../../context/UserInfoContext";
import style from "./Signup.module.css";
import appStyles from "../../App.module.css";
import { useNavigate } from "react-router-dom";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";

function AddCar() {
  const { setIsDriver } = useContext(UserInfoContext);
  const navigate = useNavigate();

  const onSuccess = (onReceived) => {
    localStorage.setItem("isDriver", `${onReceived.result.isDriver}`);
    setIsDriver(onReceived.result.isDriver);
    navigate("/dashboard", {
      replace: true,
    });
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create/add-car",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  function addCarHandler(vehicleInfo) {
    performFetch({
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ vehicleInfo }),
    });
  }

  let statusComponent = null;
  if (error != null) {
    statusComponent = <Error error={error.toString()} />;
  } else if (isLoading) {
    statusComponent = <Loading />;
  }

  return (
    <section className={style.signupPage}>
      <h1 className={appStyles.h1Desktop}>Add Car to be a Deliverer</h1>
      <AddCarForm onAddCar={addCarHandler} />
      {statusComponent}
    </section>
  );
}

export default AddCar;
