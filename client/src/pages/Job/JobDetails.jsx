import React from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import InputStyled from "../../components/InputStyled";
import styles from "./JobDetails.module.css";
import appStyles from "../../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

import {
  faBox,
  faContactBook,
  faLocationPin,
  faNoteSticky,
  faRuler,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useState, useContext } from "react";
import Loading from "../../components/Loading/Loading";
import NotifierContext from "../../context/NotifierContext";

const JobDetails = () => {
  const [isDriver, setIsDriver] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    item: "",
    description: "",
    fromPostCode: "",
    toPostCode: "",
    width: "",
    height: "",
    length: "",
    date: "",
    phoneNo: "",
  });
  const form = React.useRef();
  const { id } = useParams();
  const { notifier } = useContext(NotifierContext);

  const onSuccess = (onReceived) => {
    setJobDetails(onReceived.result);
    if (!isLocked) {
      notifier(onReceived.message);
    }
    onReceived.result.delivererIDs?.includes(localStorage.getItem("userID"))
      ? setIsAccepted(true)
      : setIsAccepted(false);
  };

  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    `/jobs/${id}`,
    onSuccess
  );

  useEffect(() => {
    if (localStorage.getItem("isDriver") !== "true") {
      setIsDriver(false);
    } else {
      setIsDriver(true);
    }
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return cancelFetch;
  }, []);

  const editHandler = (e) => {
    e.preventDefault();
    isLocked ? setIsLocked(false) : setIsLocked(true);
  };

  const acceptHandler = () => {
    isAccepted ? setIsAccepted(false) : setIsAccepted(true);
    performFetch({
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        job: {
          delivererIDs: [localStorage.getItem("userID")],
        },
      }),
    });
  };

  const saveHandler = (e) => {
    e.preventDefault();
    performFetch({
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        job: jobDetails,
      }),
    });
    setIsLocked(true);
  };

  const changeHandler = (e) => {
    const el = e.target;
    const name = el.name;
    const value = el.value;
    if (value !== "") setJobDetails((values) => ({ ...values, [name]: value }));
  };

  function deleteHandler() {
    performFetch({
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
  }

  if (error) {
    return (
      <h2 className={appStyles.h1Desktop}>
        {error.message} : This job does not exist, please return to the home
        page.
      </h2>
    );
  } else if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  // const dateFormat = (date) => {
  //   const d = new Date(date);
  //   const fullDate =
  //     ("0" + d.getDate()).slice(-2) +
  //     "-" +
  //     ("0" + (d.getMonth() + 1)).slice(-2) +
  //     "-" +
  //     d.getFullYear();

  //   return fullDate;
  // };

  const dateInverter = (date) => {
    const d = new Date(date);
    const invertedDate =
      d.getFullYear() +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + d.getDate()).slice(-2);
    return invertedDate;
  };

  return (
    <div>
      <h2 className={appStyles.h1Desktop}>Job Details</h2>
      {jobDetails.item && (
        <form className={styles.formClass} name="dropRequest" ref={form}>
          <div className={styles.jobView}>
            <InputStyled
              name="item"
              required
              disabled={isLocked}
              icon={<FontAwesomeIcon icon={faBox} />}
              // placeholder={JSON.stringify(jobDetails.item)
              defaultValue={jobDetails.item}
              placeholder="Dining chair"
              data-err="Please enter a proper item name at least 3 characters"
              pattern="^[a-zA-Z0-9\s,-]{3,}"
              onChange={changeHandler}
            ></InputStyled>

            <div className={styles.sizes}>
              <InputStyled
                name="width"
                required
                disabled={isLocked}
                icon={<FontAwesomeIcon icon={faRuler} />}
                placeholder="23"
                defaultValue={jobDetails.width}
                data-err="Please enter a number of centimeters"
                pattern="^[0-9]{1,}"
                onChange={changeHandler}
              ></InputStyled>

              <InputStyled
                name="height"
                disabled={isLocked}
                required
                icon={<FontAwesomeIcon icon={faRuler} />}
                placeholder="23"
                defaultValue={jobDetails.height}
                data-err="Please enter a number of centimeters"
                pattern="^[0-9]{1,}"
                onChange={changeHandler}
              ></InputStyled>
              <InputStyled
                name="length"
                required
                disabled={isLocked}
                icon={<FontAwesomeIcon icon={faRuler} />}
                placeholder="23"
                defaultValue={jobDetails.length}
                data-err="Please enter a number of centimeters"
                pattern="^[0-9]{1,}"
                onChange={changeHandler}
              ></InputStyled>
            </div>
            <div className={styles.sizes}>
              <InputStyled
                name="fromPostCode"
                disabled={isLocked}
                required
                icon={<FontAwesomeIcon icon={faLocationPin} />}
                placeholder="1234AB"
                defaultValue={jobDetails.fromPostCode}
                data-err="Please enter the correct format of Dutch zip-code"
                pattern="^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$"
                onChange={changeHandler}
              ></InputStyled>

              <InputStyled
                name="toPostCode"
                disabled={isLocked}
                required
                icon={<FontAwesomeIcon icon={faLocationPin} />}
                placeholder="4567BC"
                defaultValue={jobDetails.toPostCode}
                data-err="Please enter the correct format of Dutch zip-code"
                pattern="^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$"
                onChange={changeHandler}
              ></InputStyled>
            </div>
            <InputStyled
              name="date"
              disabled={isLocked}
              required
              defaultValue={dateInverter(jobDetails.date)}
              // value={dateInverter(jobDetails.date)}
              type={isLocked ? "" : "date"}
              onChange={changeHandler}
            ></InputStyled>

            <InputStyled
              name="phoneNo"
              required
              disabled={isLocked}
              icon={<FontAwesomeIcon icon={faContactBook} />}
              placeholder="0612345678"
              defaultValue={jobDetails.phoneNo}
              type="tel"
              data-err="Please enter a phone number like 0612345678"
              pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
              onChange={changeHandler}
            ></InputStyled>
            <InputStyled
              name="description"
              disabled={isLocked}
              required
              icon={<FontAwesomeIcon icon={faNoteSticky} />}
              placeholder="Describe your item here"
              defaultValue={jobDetails.description}
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
                  // type={!isLocked ? "submit" : undefined}
                  type="button"
                >
                  {isLocked ? "Edit" : "Save"}
                </Button>

                <Button
                  buttonClass="outline"
                  path="/dashboard"
                  buttonHandler={deleteHandler}
                >
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
  sendPutRequest: PropTypes.func,
};
export default JobDetails;
