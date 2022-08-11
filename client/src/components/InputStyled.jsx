import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./InputStyled.module.css";
import { motion } from "framer-motion";

const InputStyled = ({
  name,
  value,
  onChange,
  multiline = false,
  icon = null,
  ...rest
}) => {
  const [focused, setFocused] = useState();
  const [errMessage, setErrMessage] = useState();
  //Debounce so we don't change state too frequently
  let timeoutId;
  function changeDebounce(e) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const valid = e.target.checkValidity();
      const message = e.target.getAttribute("data-err");
      if (!valid && message) setErrMessage(message);
      else setErrMessage("");
      onChange(e);
    }, 600);
  }

  const inputProps = {
    className: styles.genericInput,
    name: name,
    value: value,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e) => changeDebounce(e),
    ...rest,
  };

  return (
    <div className={styles.inputDiv}>
      <motion.label animate={{ y: focused ? -2 : 0 }}>
        {icon} <span>{name}</span>
      </motion.label>
      {multiline ? (
        <textarea {...inputProps}></textarea>
      ) : (
        <input {...inputProps} />
      )}
      {errMessage && <p className={styles.errorMessage}>{errMessage}</p>}
    </div>
  );
};

InputStyled.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.element,
  multiline: PropTypes.bool,
};

export default InputStyled;
