import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const UserInfoContext = createContext({
  email: "",
  setEmail: () => {},
  name: "",
  setName: () => {},
  surname: "",
  setSurname: () => {},
  jobsOfUser: {},
  setJobsOfUser: () => {},
  vehicleInfo: {},
  setVehicleInfo: () => {},
  token: "",
  setToken: () => {},
});

export function UserInfoContextProvider(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [jobsOfUser, setJobsOfUser] = useState({});
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [token, setToken] = useState("");

  const context = {
    email,
    setEmail,
    name,
    setName,
    surname,
    setSurname,
    jobsOfUser,
    setJobsOfUser,
    vehicleInfo,
    setVehicleInfo,
    token,
    setToken,
  };

  return (
    <UserInfoContext.Provider value={context}>
      {props.children}
    </UserInfoContext.Provider>
  );
}

UserInfoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserInfoContext;
