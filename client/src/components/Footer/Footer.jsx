import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import appStyle from "../../App.module.css";
import styles from "./Footer.module.css";
import {
  FaFacebook,
  FaLinkedinIn,
  FaTwitter,
  FaInstagramSquare,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelopeOpen,
} from "react-icons/fa";
import UserInfoContext from "./../../context/UserInfoContext";

const Footer = () => {
  const { setToken } = useContext(UserInfoContext);
  const navigate = useNavigate();

  let landingDashboard = "/";
  let loginLogout = {
    to: "/login",
    name: "Log in",
    onClick: () => navigate("/login"),
  };
  let signUpProfile = { to: "/user/create", name: "Sign up" };
  if (localStorage.getItem("token")) {
    landingDashboard = "/dashboard";
    signUpProfile = {
      to: `/profile/${localStorage.getItem("userID")}`,
      name: "Profile",
    };
    loginLogout = {
      to: "/",
      name: "Log out",
      onClick: () => {
        localStorage.clear();
        setToken("");
      },
    };
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.singleCta}>
          <FaMapMarkerAlt className={styles.ctaIcon} />
          <div className={styles.ctaText}>
            <h4 className={appStyle.h2Desktop}>Find us</h4>
            <span>7412 RT, Amsterdam, Netherland</span>
          </div>
        </div>

        <div className={styles.singleCta}>
          <FaPhoneAlt className={styles.ctaIcon} />
          <div className={styles.ctaText}>
            <h4 className={appStyle.h2Desktop}>Call us</h4>
            <span>98765432100</span>
          </div>
        </div>

        <div className={styles.singleCta}>
          <FaEnvelopeOpen className={styles.ctaIcon} />
          <div className={styles.ctaText}>
            <h4 className={appStyle.h2Desktop}>Mail us</h4>
            <span>info@droppy.com</span>
          </div>
        </div>
      </div>

      <hr className={styles.footerDivider} />

      <div className={styles.row}>
        <div className={styles.footerCol}>
          <div className={styles.footerWidget}>
            <div className={styles.footerLogo}>
              <Logo />
            </div>
            <div className={styles.footerText}>
              <p className={appStyle.bodyDesktop}>
                Droppy is a pay for delivery application ,the app is designed
                and built by the students of HackYourFuture programme ( class36
                ) as a graduation project.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4 className={appStyle.h2Desktop}>Quick links</h4>
          <ul className={appStyle.bodyDesktop}>
            <li>
              <Link to={landingDashboard}>home</Link>
            </li>
            <li>
              <Link to={"/about"}>about us</Link>
            </li>
            <li>
              <Link to={signUpProfile.to}>{signUpProfile.name}</Link>
            </li>
            <li>
              <Link to={loginLogout.to} onClick={loginLogout.onClick}>
                {loginLogout.name}
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={appStyle.h2Desktop}>follow us</h4>
          <div className={styles.socialLinks}>
            <Link to={"/"}>
              <FaFacebook className={styles.facebook} />
            </Link>
            <Link to={"/"} className={styles.twitter}>
              <FaTwitter />
            </Link>
            <Link to={"/"} className={styles.instagram}>
              <FaInstagramSquare />
            </Link>
            <Link to={"/"} className={styles.link}>
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>

      <hr />

      <div className={styles.copyright}>
        <p className={appStyle.bodyDesktop}>
          &copy;{new Date().getFullYear()} Droppy LTD | All rights reserved |
          Terms Of Service | Privacy
        </p>
      </div>
    </div>
  );
};

export default Footer;
