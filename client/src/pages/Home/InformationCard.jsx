import React from "react";
import style from "./Home.module.css";
import PropTypes from "prop-types";

export default function InformationCard(props) {
  return (
    <div className={style.infoCard}>
      <img className={style.cardImage} src={props.src} />
      <p className={style.cardText}>{props.text}</p>
    </div>
  );
}

InformationCard.propTypes = {
  src: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
