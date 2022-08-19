import React from "react";
import style from "./Toggle.module.css";

const Toggle = () => {
  return (
    <div className={style.container}>
      <label className={style.switch}>
        <input type="checkbox" /> <div></div>
      </label>
    </div>
  );
};

export default Toggle;
