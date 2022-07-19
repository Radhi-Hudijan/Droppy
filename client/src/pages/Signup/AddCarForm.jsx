import React, { useRef, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserInfoContext from "../../context/UserInfoContext";

// Component
import Button from "../../components/Button";

// Styles
import style from "./NewUserForm.module.css";
import appStyle from "../../App.module.css";

export default function AddCarForm(props) {
  const { email } = useContext(UserInfoContext);

  const contactInfoInputRef = useRef();
  const plateInputRef = useRef();
  const widthInputRef = useRef();
  const heightInputRef = useRef();
  const lengthInputRef = useRef();

  const [allInputs, setAllInputs] = useState({
    contact: "",
    plate: "",
    width: "",
    height: "",
    length: "",
  });

  const [allFilled, setAllFilled] = useState(false);

  useEffect(() => {
    if (
      allInputs.contact &&
      allInputs.plate &&
      allInputs.width &&
      allInputs.height &&
      allInputs.length
    ) {
      setAllFilled(true);
    } else {
      setAllFilled(false);
    }
  }, [allInputs]);

  let car = "";
  const isCar = () => {
    car = true;
  };

  const isNotCar = () => {
    car = false;
  };

  function submitHandler(e) {
    e.preventDefault();

    const enteredContactInfo = car ? contactInfoInputRef.current.value : null;
    const enteredPlate = car ? plateInputRef.current.value : null;
    const enteredWidth = car ? widthInputRef.current.value : null;
    const enteredHeight = car ? heightInputRef.current.value : null;
    const enteredLength = car ? lengthInputRef.current.value : null;

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
      <p className={appStyle.boldBodyDesktop}>
        *To register your car fill all the fields*
      </p>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            onChange={(e) =>
              setAllInputs({ ...allInputs, contact: e.target.value })
            }
            id="contact"
            ref={contactInfoInputRef}
            aria-label="contact info"
            placeholder="Preferred contact info (email/number)*"
            className={style.signupInput}
            value={allInputs.contact}
          />
        </div>
        <div>
          <input
            type="text"
            onChange={(e) =>
              setAllInputs({ ...allInputs, plate: e.target.value })
            }
            id="plate"
            ref={plateInputRef}
            aria-label="plate number"
            placeholder="Plate Number*"
            className={style.signupInput}
            value={allInputs.plate}
          />
        </div>
        <div>
          <h3 className={appStyle.bodyDesktop}>
            Available Car Space for Items (W x H x L)
          </h3>
          <input
            type="number"
            min="0"
            onChange={(e) =>
              setAllInputs({ ...allInputs, width: e.target.value })
            }
            id="width"
            ref={widthInputRef}
            aria-label="width"
            placeholder="00cm*"
            className={style.sizeInput}
            value={allInputs.width}
          />
          <input
            type="number"
            min="0"
            onChange={(e) =>
              setAllInputs({ ...allInputs, height: e.target.value })
            }
            id="height"
            ref={heightInputRef}
            aria-label="height"
            placeholder="00cm*"
            className={style.sizeInput}
            value={allInputs.height}
          />
          <input
            type="number"
            min="0"
            onChange={(e) =>
              setAllInputs({ ...allInputs, length: e.target.value })
            }
            id="length"
            ref={lengthInputRef}
            aria-label="length"
            placeholder="00cm*"
            className={style.sizeInput}
            value={allInputs.length}
          />
        </div>
        {allFilled === true ? (
          <div>
            <p className={appStyle.bodyDesktop}>Let&apos; add your car!</p>
            <Button type="submit" class="buttonBorder" buttonHandler={isCar}>
              Register car and sign up
            </Button>
          </div>
        ) : (
          <div>
            <p className={appStyle.bodyDesktop}>
              Don&apos;t want to be a driver? No problem.
            </p>
            <Button
              path="/user"
              type="button"
              class="button"
              buttonHandler={isNotCar}
            >
              Sign up without car
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

AddCarForm.propTypes = {
  onAddCar: PropTypes.func.isRequired,
};
