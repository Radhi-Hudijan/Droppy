import React, { useRef, useContext } from "react";
import PropTypes from "prop-types";
import UserInfoContext from "../../context/UserInfoContext";
import Button from "../../components/Button";
import style from "./NewUserForm.module.css";

export default function AddCarForm(props) {
  const { email } = useContext(UserInfoContext);

  const contactInfoInputRef = useRef();
  const plateInputRef = useRef();
  const widthInputRef = useRef();
  const heightInputRef = useRef();
  const lengthInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const enteredContactInfo = contactInfoInputRef.current.value;
    const enteredPlate = plateInputRef.current.value;
    const enteredWidth = widthInputRef.current.value;
    const enteredHeight = heightInputRef.current.value;
    const enteredLength = lengthInputRef.current.value;

    const vehicleInfo = {
      email,
      contact: enteredContactInfo,
      plate: enteredPlate,
      width: enteredWidth,
      height: enteredHeight,
      length: enteredLength,
    };

    props.onAddCar(vehicleInfo);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            required
            id="contact"
            ref={contactInfoInputRef}
            aria-label="contact info"
            placeholder="Preferred contact info (email/phone number)"
            className={style.signupInput}
          />
        </div>
        <div>
          <input
            type="text"
            required
            id="plate"
            ref={plateInputRef}
            aria-label="plate number"
            placeholder="Plate Number"
            className={style.signupInput}
          />
        </div>
        <div>
          <h3>Available Car Space for Items (W x H x L)</h3>
          <input
            type="number"
            required
            id="width"
            ref={widthInputRef}
            aria-label="width"
            placeholder="00cm"
            className={style.sizeInput}
          />
          <input
            type="number"
            required
            id="height"
            ref={heightInputRef}
            aria-label="height"
            placeholder="00cm"
            className={style.sizeInput}
          />
          <input
            type="number"
            required
            id="length"
            ref={lengthInputRef}
            aria-label="length"
            placeholder="00cm"
            className={style.sizeInput}
          />
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

AddCarForm.propTypes = {
  onAddCar: PropTypes.func.isRequired,
};
