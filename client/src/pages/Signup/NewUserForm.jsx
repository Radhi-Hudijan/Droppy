import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import style from "./NewUserForm.module.css";

export default function NewUserForm(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const surnameInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
      name: enteredName,
      surname: enteredSurname,
    };
    props.onAddUser(userData);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="email"
            required
            id="email"
            ref={emailInputRef}
            aria-label="email"
            placeholder="Email"
            className={style.signupInput}
          />
        </div>
        <div>
          <input
            type="password"
            required
            id="password"
            ref={passwordInputRef}
            aria-label="password"
            placeholder="Password"
            className={style.signupInput}
          />
        </div>
        <div>
          <input
            type="text"
            required
            id="name"
            ref={nameInputRef}
            aria-label="name"
            placeholder="Name"
            className={style.signupInput}
          />
        </div>
        <div>
          <input
            type="text"
            required
            id="surname"
            ref={surnameInputRef}
            aria-label="surname"
            placeholder="Surname"
            className={style.signupInput}
          />
        </div>
        <div>
          <Button
            type="submit"
            path="/user/create/add-car"
            onClick={() => props.setIsClicked(true)}
          >
            Add car to be deliverer
          </Button>
        </div>
        <div>
          <Button type="submit" path="/user">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}

NewUserForm.propTypes = {
  onAddUser: PropTypes.func.isRequired,
  setIsClicked: PropTypes.func.isRequired,
};
