import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const NotifierContext = createContext();

export function NotifierContextProvider({ children }) {
  const [alertMessage, setAlertMessage] = useState(null);

  const notifier = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  return (
    <NotifierContext.Provider
      value={{
        notifier,
        alertMessage,
        setAlertMessage,
      }}
    >
      {children}
    </NotifierContext.Provider>
  );
}

NotifierContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotifierContext;
