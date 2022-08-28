import React, { useEffect, useContext, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewUserForm from "./NewUserForm";
import useFetch from "../../hooks/useFetch";
import UserInfoContext from "../../context/UserInfoContext";
import style from "./Signup.module.css";
import appStyles from "../../App.module.css";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";

function Signup() {
  const navigate = useNavigate();

  const { setToken } = useContext(UserInfoContext);

  const onSuccess = (onReceived) => {
    localStorage.setItem("token", onReceived.result.token);
    setToken(onReceived.data);
    localStorage.setItem("userID", onReceived.result.userID);
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

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  function addUserHandler(user) {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
  }

  return (
    <section data-testid="container" className={style.signupPage}>
      <h1 className={appStyles.h1Desktop}>Sign up</h1>
      <NewUserForm onAddUser={addUserHandler} />
      {isLoading && <Loading />}
      <div className={appStyles.bodyDesktop}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>

      {error != null && <Error error={error} />}
    </section>
  );
}

export default Signup;
