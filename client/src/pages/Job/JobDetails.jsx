import React from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import InputStyled from "../../components/InputStyled";
import styles from "./JobDetails.module.css";
import appStyles from "../../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faContactBook,
  faLocationPin,
  faNoteSticky,
  faRuler,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";

const JobDetails = ({ sendPutRequest }) => {
  const [inputs, setInputs] = React.useState({});
  const [isDriver, setIsDriver] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    item: "",
    description: "",
    from: "",
    to: "",
    width: "",
    height: "",
    length: "",
    date: "",
    phone: "",
  });
  const form = React.useRef();

  let currentJob;
  useEffect(() => {
    if (localStorage.getItem("isDriver") !== true) {
      setIsDriver(false);
    } else {
      setIsDriver(true);
    }

    if (localStorage.getItem("job") === true) {
      currentJob = JSON.parse(localStorage.getItem("job"));
      setJobDetails({
        item: currentJob.item,
        description: currentJob.description,
        from: currentJob.fromPostCode,
        to: currentJob.toPostCode,
        width: currentJob.width,
        height: currentJob.height,
        length: currentJob.length,
        date: currentJob.date,
        phone: currentJob.phoneNo,
      });
      return;
    }
  }, []);

  const editHandler = () => {
    isLocked ? setIsLocked(false) : setIsLocked(true);
  };

  const acceptHandler = () => {
    isAccepted ? setIsAccepted(false) : setIsAccepted(true);
  };

  const saveHandler = (e) => {
    form.current.checkValidity();
    form.current.reportValidity();
    e.preventDefault();
    sendPutRequest(inputs);
  };

  const changeHandler = (e) => {
    const el = e.target;
    const name = el.name;
    const value = el.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <h2 className={appStyles.h1Desktop}>
        {jobDetails.item
          ? "Job details"
          : "This job does not exist, please return to the home page."}
      </h2>
      {jobDetails.item && (
        <form className={styles.formClass} name="dropRequest" ref={form}>
          <div className={styles.jobView}>
            <InputStyled
              name="item"
              disabled={isLocked}
              icon={<FontAwesomeIcon icon={faBox} />}
              placeholder={jobDetails.item}
              required
              data-err="Please enter a proper item name at least 3 characters"
              pattern="^[a-zA-Z0-9\s,-]{3,}"
              onChange={changeHandler}
            ></InputStyled>
            <div className={styles.sizes}>
              <InputStyled
                name="width"
                disabled={isLocked}
                icon={<FontAwesomeIcon icon={faRuler} />}
                placeholder={jobDetails.width}
                required
                data-err="Please enter a number of centimeters"
                pattern="^[0-9]{1,}"
                onChange={changeHandler}
              ></InputStyled>
              <InputStyled
                name="height"
                disabled={isLocked}
                icon={<FontAwesomeIcon icon={faRuler} />}
                placeholder={jobDetails.height}
                required
                data-err="Please enter a number of centimeters"
                pattern="^[0-9]{1,}"
                onChange={changeHandler}
              ></InputStyled>
              <InputStyled
                name="length"
                disabled={isLocked}
                icon={<FontAwesomeIcon icon={faRuler} />}
                placeholder={jobDetails.length}
                required
                data-err="Please enter a number of centimeters"
                pattern="^[0-9]{1,}"
                onChange={changeHandler}
              ></InputStyled>
            </div>
            <div className={styles.sizes}>
              <InputStyled
                name="fromPostCode"
                disabled={isLocked}
                icon={<FontAwesomeIcon icon={faLocationPin} />}
                placeholder={jobDetails.from}
                required
                data-err="Please enter the correct format of Dutch zip-code"
                pattern="^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$"
                onChange={changeHandler}
              ></InputStyled>
              <InputStyled
                name="toPostCode"
                disabled={isLocked}
                icon={<FontAwesomeIcon icon={faLocationPin} />}
                placeholder={jobDetails.to}
                required
                data-err="Please enter the correct format of Dutch zip-code"
                pattern="^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$"
                onChange={changeHandler}
              ></InputStyled>
            </div>
            <InputStyled
              name="date"
              disabled={isLocked}
              placeholder={jobDetails.date}
              type="date"
              required
              onChange={changeHandler}
            ></InputStyled>
            <InputStyled
              name="phoneNo"
              disabled={isLocked}
              icon={<FontAwesomeIcon icon={faContactBook} />}
              placeholder={jobDetails.phone}
              type="tel"
              data-err="Please enter a phone number like 0612345678"
              pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
              required
              onChange={changeHandler}
            ></InputStyled>
            <InputStyled
              name="description"
              disabled={isLocked}
              icon={<FontAwesomeIcon icon={faNoteSticky} />}
              placeholder={jobDetails.description}
              multiline
              onChange={changeHandler}
            ></InputStyled>

            {isDriver ? (
              <div className={styles.buttonDiv}>
                {isAccepted && (
                  <Button
                    class="buttonBorder"
                    buttonHandler={acceptHandler}
                    // rest={{ form: "dropRequest" }}
                  >
                    Cancel
                  </Button>
                )}

                {!isAccepted && (
                  <Button
                    buttonClass="outline"
                    path="/dashboard"
                    buttonHandler={acceptHandler}
                  >
                    Accept
                  </Button>
                )}
              </div>
            ) : (
              <div className={styles.buttonDiv}>
                <Button
                  class="buttonBorder"
                  buttonHandler={isLocked ? editHandler : saveHandler}
                  // rest={{ form: "dropRequest" }}
                >
                  {isLocked ? "Edit" : "Save"}
                </Button>

                <Button buttonClass="outline" path="/dashboard">
                  Delete
                </Button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

JobDetails.propTypes = {
  sendPutRequest: PropTypes.func.isRequired,
};
export default JobDetails;
