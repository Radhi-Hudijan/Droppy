import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import style from "./JobCard.module.css";
import appStyle from "../../App.module.css";
import Furniture from "../../assets/icons/furniture.svg";
import Devices from "../../assets/icons/devices.svg";
import BoxDelivery from "../../assets/icons/boxDelivery.svg";

function JobCard({ job }) {
  const {
    fromPostCode,
    toPostCode,
    date,
    width,
    height,
    length,
    category,
    item,
  } = job;
  const navigate = useNavigate();

  function toDetail(e) {
    e.preventDefault();
    navigate(`/job/view/${job._id}`);
  }

  const formattedDate = date.split("T")[0].split("-").reverse().join("-");

  return (
    <div className={style["job-card"]} onClick={toDetail}>
      <div className={style.itemDiv}>
        <img
          src={
            category === "FURNITURE"
              ? Furniture
              : category === "ELECTRONICS"
              ? Devices
              : BoxDelivery
          }
        />
        <h3>{category}</h3>
      </div>
      <div className={style.item}>
        <h3 className={appStyle.h2Desktop}>{item}</h3>
      </div>
      <div className={style.fromToDiv}>
        <h5 className={appStyle.boldBodyDesktop}>
          From: <span className={appStyle.bodyDesktop}> {fromPostCode}</span>
        </h5>
        <h5 className={appStyle.boldBodyDesktop}>
          To: <span className={appStyle.bodyDesktop}>{toPostCode}</span>
        </h5>
      </div>
      <div className={style.dateDiv}>
        <h5 className={appStyle.boldBodyDesktop}>
          Delivery Date:
          <br />
          <span className={appStyle.bodyDesktop}>{formattedDate}</span>
        </h5>
      </div>
      <div className={style.size}>
        <h5 className={appStyle.boldBodyDesktop}>
          Width: <span className={appStyle.bodyDesktop}>{width}cm</span>
        </h5>
        <h5 className={appStyle.boldBodyDesktop}>
          Height: <span className={appStyle.bodyDesktop}>{height}cm</span>
        </h5>
        <h5 className={appStyle.boldBodyDesktop}>
          Length: <span className={appStyle.bodyDesktop}>{length}cm</span>
        </h5>
      </div>
    </div>
  );
}

export default JobCard;

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};
