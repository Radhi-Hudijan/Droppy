import React from "react";
import PropTypes from "prop-types";

// Style
import style from "./Logo.module.css";

// To use this component import the src of the logo as an object and use it in the props
export default function Logo(props) {
  return (
    <div className={style.logo}>
      <img src={props.src} />
    </div>
  );
}

Logo.propTypes = {
  src: PropTypes.object.isRequired,
};
