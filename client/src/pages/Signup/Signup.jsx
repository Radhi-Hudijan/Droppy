import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NewUserForm from "./NewUserForm";
import useFetch from "../../hooks/useFetch";
import UserInfoContext from "../../context/UserInfoContext";
import style from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const { setEmail, setName, setSurname } = useContext(UserInfoContext);
  const userDataOnSuccess = {
    email: "",
    name: "",
    surname: "",
  };

  const onSuccess = () => {
    setName(userDataOnSuccess.name);
    setSurname(userDataOnSuccess.surname);
    setEmail(userDataOnSuccess.email);
    navigate("/user/create/add-car", {
      replace: true,
    });
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );
  useEffect(() => {
    return cancelFetch;
  }, []);

  function addUserHandler(user) {
    userDataOnSuccess.name = user.name;
    userDataOnSuccess.surname = user.surname;
    userDataOnSuccess.email = user.email;
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
  }

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div>Error while trying to create user: {error.toString()}</div>
    );
  } else if (isLoading) {
    statusComponent = <div>Creating user....</div>;
  }

  return (
    <section data-testid="container" className={style.signupPage}>
      <h1 className="h1-desktop">Sign up</h1>
      <NewUserForm onAddUser={addUserHandler} />
      {statusComponent}
    </section>
  );
}

export default Signup;
