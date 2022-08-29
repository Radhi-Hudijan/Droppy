import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import useMediaQuery, { QUERIES } from "../../hooks/useMediaQuery";
import Logo from "../Logo";
import styles from "./Nav.module.css";
import appStyle from "../../App.module.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Divider from "../Divider";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import burger from "../../assets/icons/burger-icon.svg";
import UserInfoContext from "../../context/UserInfoContext";

const Nav = ({ opened }) => {
  const isMdScreen = useMediaQuery(QUERIES.md);
  const [isOpen, setIsOpen] = useState(false);
  const openHandler = () => {
    setIsOpen(!isOpen);
    opened();
  };

  const getNavLinks = () => {
    const { token, setToken } = useContext(UserInfoContext);

    useEffect(() => {
      setToken(localStorage.getItem("token"));
    }, [token]);

    return (
      <ul>
        <Link
          key="1"
          to={token ? "/dashboard" : "/"}
          data-testid="linkToHome"
          onClick={() => {
            if (isMdScreen) return;
            setIsOpen(false);
            opened();
          }}
        >
          <li className={appStyle.h2Desktop}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ flexDirection: "row" }}
            >
              <span>Home</span>
              {!isMdScreen && <FontAwesomeIcon icon={faArrowRight} />}
            </motion.div>
          </li>
        </Link>
        <Link
          key="2"
          to={"/about"}
          data-testid="linkToAbout"
          onClick={() => {
            if (isMdScreen) return;
            setIsOpen(false);
            opened();
          }}
        >
          <li className={appStyle.h2Desktop}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ flexDirection: "row" }}
            >
              <span>About</span>
              {!isMdScreen && <FontAwesomeIcon icon={faArrowRight} />}
            </motion.div>
          </li>
        </Link>
        {token && (
          <Link
            key="3"
            to={`/profile/${localStorage.getItem("userID")}`}
            data-testid="linkToLogin"
            onClick={() => {
              if (isMdScreen) return;
              setIsOpen(false);
              opened();
            }}
          >
            <li className={appStyle.h2Desktop}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ flexDirection: "row" }}
              >
                <span>Profile {localStorage.getItem("initials")}</span>
                {!isMdScreen && <FontAwesomeIcon icon={faArrowRight} />}
              </motion.div>
            </li>
          </Link>
        )}
        <Link
          key="4"
          to={token ? "/" : "/login"}
          data-testid="linkToLogin"
          onClick={() => {
            if (token) {
              localStorage.clear();
              window.reload();
            }
            if (isMdScreen) return;
            setIsOpen(false);
            opened();
          }}
        >
          <li className={appStyle.h2Desktop}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ flexDirection: "row" }}
            >
              <span>
                {localStorage.getItem("token") ? "Log out" : "Log in"}
              </span>
              {!isMdScreen && <FontAwesomeIcon icon={faArrowRight} />}
            </motion.div>
          </li>
        </Link>
      </ul>
    );
  };

  return (
    <div className={styles.nav}>
      {!isMdScreen && (
        <motion.div className={styles.navNormal}>
          <motion.div whileTap={{ scale: 0.9 }} onClick={openHandler}>
            <img src={burger} />
          </motion.div>
        </motion.div>
      )}
      <div className={styles.drawer}>
        <div className={styles.logoDiv}>
          <Logo />
        </div>

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
