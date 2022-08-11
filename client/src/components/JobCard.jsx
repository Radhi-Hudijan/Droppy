import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import style from "./JobCard.module.css";

function JobCard({ job }) {
  const { item, fromPostCode, toPostCode, date, width, height, length } = job;
  const navigate = useNavigate();

  function toDetail(e) {
    e.preventDefault();
    localStorage.setItem("job", JSON.stringify(job));
    navigate("/detail");
  }

  return (
    <div className={style["job-card"]} onClick={toDetail}>
      <div className={style.jobCardUpperDiv}>
        <div className={style.itemDiv}>
          <h3>{item}</h3>
        </div>
        <div className={style.fromToDiv}>
          <h5>From: {fromPostCode}</h5>
          <h5>To: {toPostCode}</h5>
        </div>
        <div className={style.dateDiv}>
          <h5>Date: {date}</h5>
        </div>
      </div>
      <div className={style.jobCardBelowDiv}>
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
