import React from "react";
import PropTypes from "prop-types";
import styles from "./Error.module.css";

const Error = ({ error }) => {
  return (
    <section className={styles.container}>
      {/* <header className={styles.header}>
        <h3 className={styles.title}>Oops! An error occured!</h3>
      </header> */}
      <div className={styles.body}>
        <p>
          <strong>{error.toString()}</strong>
        </p>
      </div>
    </section>
  );
};

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
export default Error;
