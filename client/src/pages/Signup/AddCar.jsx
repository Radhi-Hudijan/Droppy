import React, { useEffect, useContext } from "react";
import AddCarForm from "./AddCarForm";
import useFetch from "../../hooks/useFetch";
import UserInfoContext from "../../context/UserInfoContext";
import style from "./Signup.module.css";
import appStyles from "../../App.module.css";

function AddCar() {
  const { setVehicleInfo } = useContext(UserInfoContext);

  let vehicleInfoOnSuccess;
  const onSuccess = () => {
    setVehicleInfo(vehicleInfoOnSuccess);
    window.location = "/dashboard";
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create/add-car",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  function addCarHandler(vehicleInfo) {
    vehicleInfoOnSuccess = vehicleInfo;
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
    statusComponent = (
      <div>Error while trying to add car: {error.toString()}</div>
    );
  } else if (isLoading) {
    statusComponent = <div>Adding car....</div>;
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
