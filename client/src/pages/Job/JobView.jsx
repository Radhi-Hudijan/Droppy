import React from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import InputStyled from "../../components/InputStyled";
import styles from "./JobView.module.css";
import appStyles from "../../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faContactBook,
  faLocationPin,
  faNoteSticky,
  faRuler,
} from "@fortawesome/free-solid-svg-icons";

const JobView = ({ jobHandler }) => {
  const [inputs, setInputs] = React.useState({});
  const form = React.useRef();

  const changeHandler = (e) => {
    const el = e.target;
    const name = el.name;
    const value = el.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitHandler = (e) => {
    form.current.checkValidity();
    form.current.reportValidity();
    e.preventDefault();
    jobHandler(inputs);
  };

  return (
    <form className={styles.formClass} name="dropRequest" ref={form}>
      <h2 className={appStyles.h1Desktop}>Create a new drop request</h2>
      <div className={styles.jobView}>
        <InputStyled
          name="item"
          disabled={true}
          icon={<FontAwesomeIcon icon={faBox} />}
          placeholder="Your item name"
          required
          data-err="Please enter a proper item name at least 3 characters"
          pattern="^[a-zA-Z0-9\s,-]{3,}"
          onChange={changeHandler}
        ></InputStyled>
        <div className={styles.sizes}>
          <InputStyled
            name="width"
            icon={<FontAwesomeIcon icon={faRuler} />}
            placeholder="23cm"
            required
            data-err="Please enter a number of centimeters"
            pattern="^[0-9]{1,}"
            onChange={changeHandler}
          ></InputStyled>
          <InputStyled
            name="height"
            icon={<FontAwesomeIcon icon={faRuler} />}
            placeholder="23cm"
            required
            data-err="Please enter a number of centimeters"
            pattern="^[0-9]{1,}"
            onChange={changeHandler}
          ></InputStyled>
          <InputStyled
            name="length"
            icon={<FontAwesomeIcon icon={faRuler} />}
            placeholder="23cm"
            required
            data-err="Please enter a number of centimeters"
            pattern="^[0-9]{1,}"
            onChange={changeHandler}
          ></InputStyled>
        </div>
        <div className={styles.sizes}>
          <InputStyled
            name="fromPostCode"
            icon={<FontAwesomeIcon icon={faLocationPin} />}
            placeholder="1523DE"
            required
            data-err="Please enter the correct format of Dutch zip-code"
            pattern="^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$"
            onChange={changeHandler}
          ></InputStyled>
          <InputStyled
            name="toPostCode"
            icon={<FontAwesomeIcon icon={faLocationPin} />}
            placeholder="1523DE"
            required
            data-err="Please enter the correct format of Dutch zip-code"
            pattern="^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$"
            onChange={changeHandler}
          ></InputStyled>
        </div>
        <InputStyled
          name="date"
          type="date"
          required
          onChange={changeHandler}
        ></InputStyled>
        <InputStyled
          name="phoneNo"
          icon={<FontAwesomeIcon icon={faContactBook} />}
          placeholder="Phone number"
          type="tel"
          data-err="Please enter a phone number like 0612345678"
          pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
          required
          onChange={changeHandler}
        ></InputStyled>
        <InputStyled
          name="description"
          icon={<FontAwesomeIcon icon={faNoteSticky} />}
          placeholder="Description of request"
          multiline
          onChange={changeHandler}
        ></InputStyled>
        <Button buttonClass="outline" path="/dashboard">
          Cancel
        </Button>
        <Button
          type="submit"
          buttonHandler={submitHandler}
          rest={{ form: "dropRequest" }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

JobView.propTypes = {
  jobHandler: PropTypes.func.isRequired,
};

export default JobView;
