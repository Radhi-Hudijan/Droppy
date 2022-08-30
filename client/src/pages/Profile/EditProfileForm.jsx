import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import style from "./EditProfileForm.module.css";
import appStyle from "../../App.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRuler,
  faUser,
  faEnvelope,
  faPhone,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";

export default function EditProfileForm(props) {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const phoneNoInputRef = useRef();
  const plateNoInputRef = useRef();
  const widthInputRef = useRef();
  const heightInputRef = useRef();
  const lengthInputRef = useRef();
  const [addCar, setAddCar] = useState(false);

  function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredPhoneNo = addCar ? phoneNoInputRef.current.value : "";
    const enteredPlateNo = addCar ? plateNoInputRef.current.value : "";
    const enteredWidth = addCar ? widthInputRef.current.value : "";
    const enteredHeight = addCar ? heightInputRef.current.value : "";
    const enteredLength = addCar ? lengthInputRef.current.value : "";

    const userData = {
      email: enteredEmail,
      name: enteredName,
      surname: enteredSurname,
      vehicleInfo: {
        contact: enteredPhoneNo,
        plate: enteredPlateNo,
        width: enteredWidth,
        length: enteredLength,
        height: enteredHeight,
      },
    };

    props.onSaveDetails(userData);
  }

  const addCarHandler = () => {
    setAddCar(true);
  };

  useEffect(() => {
    if (props.hasDriverDetails) setAddCar(true);
  }, []);

  return (
    <div className={style.editProfileForm}>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <label className={appStyle.bodyDesktop}>First Name</label>
            <div className={style.inputDiv}>
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                required
                id="name"
                pattern="^[a-zA-Z0-9\s,-]{3,50}"
                ref={nameInputRef}
                defaultValue={props.user.name}
                aria-label="name"
                placeholder="John"
                className={appStyle.bodyDesktop}
              />
            </div>
          </div>
          <div>
            <label className={appStyle.bodyDesktop}>Last Name</label>
            <div className={style.inputDiv}>
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                required
                id="surname"
                pattern="^[a-zA-Z0-9\s,-]{3,50}"
                ref={surnameInputRef}
                defaultValue={props.user.surname}
                aria-label="surname"
                placeholder="Doe"
                className={appStyle.bodyDesktop}
              />
            </div>
          </div>
          <div>
            <label className={appStyle.bodyDesktop}>Email</label>
            <div className={style.inputDiv}>
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                required
                id="email"
                ref={emailInputRef}
                defaultValue={props.user.email}
                aria-label="email"
                placeholder="johndoe@email.com"
                className={appStyle.bodyDesktop}
              />
            </div>
          </div>
        </div>

        {!addCar && (
          <div className={style.singleButton}>
            <Button buttonHandler={addCarHandler} class="buttonBorder">
              Add a car to your profile
            </Button>
          </div>
        )}

        <div className={!addCar ? style.opacity : ""}>
          <div>
            <div>
              <label className={appStyle.bodyDesktop}>Phone Number</label>
              <div className={style.inputDiv}>
                <FontAwesomeIcon icon={faPhone} />
                <input
                  type="text"
                  required={addCar}
                  disabled={!addCar}
                  ref={phoneNoInputRef}
                  id="contact"
                  aria-label="contact info"
                  defaultValue={props.user.vehicleInfo.contact}
                  placeholder="0612345678"
                  data-err="Please enter a phone number like 0612345678"
                  pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
                  className={appStyle.bodyDesktop}
                />
              </div>
            </div>
            <div>
              <label className={appStyle.bodyDesktop}>Plate Number</label>
              <div className={style.inputDiv}>
                <FontAwesomeIcon icon={faCar} />
                <input
                  type="text"
                  id="plate"
                  ref={plateNoInputRef}
                  required={addCar}
                  disabled={!addCar}
                  aria-label="plate number"
                  placeholder="NL-01-AB"
                  defaultValue={props.user.vehicleInfo.plate}
                  className={appStyle.bodyDesktop}
                />
              </div>
            </div>
            <h6 className={`${appStyle.boldBodyDesktop} ${style.header6}`}>
              Available car space:
            </h6>
            <div>
              <div className={style.dimensionsContainer}>
                <div className={style.dimensionDiv}>
                  <label className={appStyle.bodyDesktop}>Width (cm)</label>
                  <div className={style.inputDimension}>
                    <FontAwesomeIcon icon={faRuler} />
                    <input
                      type="number"
                      pattern="^[0-9]{1,}"
                      data-err="Please enter a number of centimeters"
                      min="0"
                      required={addCar}
                      disabled={!addCar}
                      ref={widthInputRef}
                      id="width"
                      aria-label="width"
                      defaultValue={props.user.vehicleInfo.width}
                      placeholder="00cm*"
                      className={appStyle.bodyDesktop}
                    />
                  </div>
                </div>
                <div className={style.dimensionDiv}>
                  <label className={appStyle.bodyDesktop}>Height (cm)</label>
                  <div className={style.inputDimension}>
                    <FontAwesomeIcon icon={faRuler} />
                    <input
                      type="number"
                      min="0"
                      required={addCar}
                      disabled={!addCar}
                      id="height"
                      ref={heightInputRef}
                      pattern="^[0-9]{1,}"
                      data-err="Please enter a number of centimeters"
                      defaultValue={props.user.vehicleInfo.height}
                      aria-label="height"
                      placeholder="00cm*"
                      className={appStyle.bodyDesktop}
                    />
                  </div>
                </div>
                <div className={style.dimensionDiv}>
                  <label className={appStyle.bodyDesktop}>Length (cm)</label>
                  <div className={style.inputDimension}>
                    <FontAwesomeIcon icon={faRuler} />
                    <input
                      type="number"
                      min="0"
                      pattern="^[0-9]{1,}"
                      data-err="Please enter a number of centimeters"
                      required={addCar}
                      disabled={!addCar}
                      ref={lengthInputRef}
                      id="length"
                      defaultValue={props.user.vehicleInfo.length}
                      aria-label="length"
                      placeholder="00cm*"
                      className={appStyle.bodyDesktop}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.singleButton}>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}

EditProfileForm.propTypes = {
  onSaveDetails: PropTypes.func,
  user: PropTypes.object,
  hasDriverDetails: PropTypes.bool,
};
