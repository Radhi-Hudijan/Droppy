import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import style from "./JobCard.module.css";

function JobCard({ job }) {
  const { item, fromPostCode, toPostCode, date, width, height, length } = job;
  const navigate = useNavigate();

  function toDetail(e) {
    e.preventDefault();
    navigate("/detail");
  }

  return (
    <div className={style["job-card"]} onClick={toDetail}>
      <h3>{item}</h3>
      <div className={style["from-to"]}>
        <h5>From: {fromPostCode}</h5>
        <h5>To: {toPostCode}</h5>
      </div>
      <h5>Date: {date}</h5>
      <div className={style["size"]}>
        <h5>Width: {width}cm</h5>
        <h5>Height: {height}cm</h5>
        <h5>Length: {length}cm</h5>
      </div>
    </div>
  );
}

export default JobCard;

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};
