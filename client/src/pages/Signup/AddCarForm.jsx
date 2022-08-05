import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserInfoContext from "../../context/UserInfoContext";

// Component
import Button from "../../components/Button";

// Styles
import style from "./NewUserForm.module.css";
import appStyle from "../../App.module.css";
import NotifierContext from "../../context/NotifierContext";

export default function AddCarForm(props) {
  const { email } = useContext(UserInfoContext);
  const { notifier } = useContext(NotifierContext);

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

  const isCar = () => {
    notifier("Success! Drive safe.");
  };
  const isNotCar = () => {
    notifier("Success! Good luck with your first request.");
  };

  function submitHandler(e) {
    e.preventDefault();

    const vehicleInfo = {
      email,
      ...allInputs,
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
