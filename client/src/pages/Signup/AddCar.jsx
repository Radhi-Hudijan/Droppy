import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AddCarForm from "./AddCarForm";
import useFetch from "../../hooks/useFetch";
import UserInfoContext from "../../context/UserInfoContext";

function AddCar() {
  const navigate = useNavigate();
  const { setVehicleInfo } = useContext(UserInfoContext);

  let vehicleInfoOnSuccess;
  const onSuccess = () => {
    setVehicleInfo(vehicleInfoOnSuccess);
    navigate("/", {
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
    <section>
      <h1 className="h1-desktop">Add Car to be a Deliverer</h1>
      <AddCarForm onAddCar={addCarHandler} />
      {statusComponent}
    </section>
  );
}

export default AddCar;
