import React, { useState } from "react";
import { useEffect } from "react";

import style from "./Notifier.module.css";
import appStyle from "../App.module.css";
import PropTypes from "prop-types";

import { useContext } from "react";
import NotifierContext from "../context/NotifierContext";

export default function Notifier() {
  const { alertMessage, setAlertMessage } = useContext(NotifierContext);
  const [notify, setNotify] = useState(style.displayNone);

  useEffect(() => {
    alertMessage ? setNotify(style.alert) : setNotify(style.displayNone);
  }, [alertMessage]);

  const closeNotif = () => {
    setAlertMessage(null);
  };

  return (
    <div className={notify}>
      <span className={style.closebtn} onClick={closeNotif}>
        &times;
      </span>
      <p className={appStyle.boldBodyDesktop}>{alertMessage}</p>
    </div>
  );
}

Notifier.propTypes = {
  children: PropTypes.object,
};
