import React from "react";
import PropTypes from "prop-types";

// Style
import style from "./Button.module.css";

export default function Button(props) {
  return (
    <div>
      <button className={style.button} onClick={props.buttonHandler}>
        GET STARTED
      </button>
    </div>
  );
}

Button.propTypes = {
  buttonHandler: PropTypes.func.isRequired,
};
