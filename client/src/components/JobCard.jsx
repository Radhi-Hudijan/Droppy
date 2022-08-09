import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const { item, fromPostCode, toPostCode, date, width, height, length } = job;
  const navigate = useNavigate();

  function toDetail(e) {
    e.preventDefault();
    navigate("/detail");
  }

  return (
    <div className="job-card" onClick={toDetail}>
      <h3>{item}</h3>
      <div className="from-to">
        <div>
          <h5>From: </h5>
          <h5>{fromPostCode}</h5>
        </div>
        <div>
          <h5>To: </h5>
          <h5>{toPostCode}</h5>
        </div>
      </div>
      <h5>{date}</h5>
      <div className="size">
        <h5>Width: {width}</h5>
        <h5>Height: {height}</h5>
        <h5>Length: {length}</h5>
      </div>
    </div>
  );
}

export default JobCard;

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};
