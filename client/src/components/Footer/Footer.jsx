import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
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

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.singleCta}>
          <FaMapMarkerAlt className={styles.ctaIcon} />
          <div className={styles.ctaText}>
            <h4 className="h2-desktop">Find us</h4>
            <span>7412 RT, Amsterdam, Netherland</span>
          </div>
        </div>

        <div className={styles.singleCta}>
          <FaPhoneAlt className={styles.ctaIcon} />
          <div className={styles.ctaText}>
            <h4 className="h2-desktop">Call us</h4>
            <span>98765432100</span>
          </div>
        </div>

        <div className={styles.singleCta}>
          <FaEnvelopeOpen className={styles.ctaIcon} />
          <div className={styles.ctaText}>
            <h4 className="h2-desktop">Mail us</h4>
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
              <p className="body-desktop">
                Droppy is a pay for delivery application ,the app is designed
                and built by the students of HackYourFuture programme ( class36
                ) as a graduation project.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4 className="h2-desktop">Quick links</h4>
          <ul className="body-desktop">
            <li>
              <Link to={"/"}>about us</Link>
            </li>
            <li>
              <Link to={"/"}>careers</Link>
            </li>
            <li>
              <Link to={"/"}>support center</Link>
            </li>
            <li>
              <Link to={"/"}>Contact us</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h4 className="h2-desktop">legal</h4>
          <ul className="body-desktop">
            <li>
              <Link to={"/"}>privacy Notice</Link>
            </li>
            <li>
              <Link to={"/"}>terms of use</Link>
            </li>
            <li>
              <Link to={"/"}>security</Link>
            </li>
            <li>
              <Link to={"/"}>customers</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h4 className="h2-desktop">follow us</h4>
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
        <p className="body-desktop">
          &copy;{new Date().getFullYear()} Droppy LTD | All rights reserved |
          Terms Of Service | Privacy
        </p>
      </div>
    </div>
  );
};

export default Footer;
