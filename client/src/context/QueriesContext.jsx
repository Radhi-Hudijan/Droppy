import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const QueriesContext = createContext({
  queries: {},
  setQueries: () => {},
});

export function QueriesContextProvider(props) {
  const [queries, setQueries] = useState({});

  const context = {
    queries,
    setQueries,
  };

  return (
    <QueriesContext.Provider value={context}>
      {props.children}
    </QueriesContext.Provider>
  );
}

QueriesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QueriesContext;
