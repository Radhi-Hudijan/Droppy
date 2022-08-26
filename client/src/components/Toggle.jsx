import React from "react";
import style from "./Toggle.module.css";
import PropTypes from "prop-types";

const Toggle = (props) => {
  return (
    <div className={style.container}>
      <label className={style.switch}>
        <input
          type="checkbox"
          defaultChecked={props.isChecked}
          onChange={props.handleToggle}
        />{" "}
        <div></div>
      </label>
    </div>
  );
};

Toggle.propTypes = {
  isChecked: PropTypes.bool,
  handleToggle: PropTypes.func.isRequired,
};
export default Toggle;
