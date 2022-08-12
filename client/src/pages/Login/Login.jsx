import React, { useEffect, useRef, useContext } from "react";
import Button from "../../components/Button";
import useFetch from "../../hooks/useFetch";
import style from "./Login.module.css";
import UserInfoContext from "../../context/UserInfoContext";
import { Link, useNavigate } from "react-router-dom";
import appStyles from "../../App.module.css";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import PropTypes from "prop-types";

function Login({ setIsLoggedin }) {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { setEmail, setName, setSurname, setVehicleInfo, setToken } =
    useContext(UserInfoContext);

  const onSuccess = (res) => {
    setIsLoggedin(true);
    localStorage.setItem("token", res.data);
    const isDriver = res.vehicleInfo.plate ? true : false;
    localStorage.setItem("isDriver", `${isDriver}`);
    localStorage.setItem("userID", res.id);
    setEmail(res.email);
    setName(res.name);
    setSurname(res.surname);
    setVehicleInfo(res.vehicleInfo);
    setToken(res.data);
    navigate("/dashboard", {
      replace: true,
    });
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/authentication",
    onSuccess
  );
  useEffect(() => {
    return cancelFetch;
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  }

  return (
    <div className={style.login}>
      <h1 className={appStyles.h1Desktop}>Log in</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            name="email"
            required
            ref={emailInputRef}
            type="email"
            aria-label="email"
            placeholder="Email"
            className={style.loginInput}
          />
        </div>
        <div>
          <input
            name="password"
            required
            ref={passwordInputRef}
            type="password"
            aria-label="password"
            placeholder="Password"
            className={style.loginInput}
          />
        </div>
        <div>
          <Button type="submit">Log in</Button>
        </div>
      </form>
      <div>
        Do not have an account? <Link to="/user/create">Sign up here</Link>
      </div>
      {isLoading && <Loading />}
      {error != null && <Error error={error} />}
    </div>
  );
}

export default Login;

Login.propTypes = {
  setIsLoggedin: PropTypes.func.isRequired,
};
