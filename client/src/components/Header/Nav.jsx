import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { CSS_G } from "../../constants";
import useMediaQuery, { QUERIES } from "../../hooks/useMediaQuery";
import Logo from "../Logo";
import styles from "./Nav.module.css";
import TEST_ID from "./Nav.testid";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Divider from "../Divider";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const NAV_CONTENT = [
  { link: "/", id: TEST_ID.linkToHome, value: "Home" },
  { link: "/about", id: TEST_ID.linkToAbout, value: "About" },
  { link: "/login", id: TEST_ID.linkToLogin, value: "Login" },
];
const Nav = ({ opened }) => {
  const isMdScreen = useMediaQuery(QUERIES.md);
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(!isOpen);
    opened();
  };

  const getNavLinks = () => (
    <ul>
      {NAV_CONTENT.map((x, idx) => (
        <Link
          key={idx}
          to={x.link}
          data-testid={x.id}
          onClick={() => {
            if (isMdScreen) return;
            setIsOpen(false);
            opened();
          }}
        >
          <li className={CSS_G.h2}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ flexDirection: "row" }}
            >
              <span>{x.value}</span>
              {!isMdScreen && <FontAwesomeIcon icon={faArrowRight} />}
            </motion.div>
          </li>
        </Link>
      ))}
    </ul>
  );
  return (
    <div className={styles.nav}>
      {!isMdScreen && (
        <motion.div className={styles.navNormal}>
          <motion.div whileTap={{ scale: 0.9 }} onClick={openHandler}>
            <img src="./burger-icon.svg" />
          </motion.div>
        </motion.div>
      )}
      <div className={styles.drawer}>
        <Logo />
        {!isMdScreen && <Divider />}
        {getNavLinks()}
      </div>
    </div>
  );
};

Nav.propTypes = {
  opened: PropTypes.func.isRequired,
};

export default Nav;
