import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { UserInfoContextProvider } from "./context/UserInfoContext";
import { NotifierContextProvider } from "./context/NotifierContext";
import { QueriesContextProvider } from "./context/QueriesContext";

/**
 * This component wraps our App with the providers we do not want to have in our tests
 */
const AppWrapper = ({ children }) => {
  return (
    <UserInfoContextProvider>
      <NotifierContextProvider>
        <QueriesContextProvider>
          <Router>{children}</Router>
        </QueriesContextProvider>
      </NotifierContextProvider>
    </UserInfoContextProvider>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppWrapper;
