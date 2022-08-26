import React from "react";
import styles from "./About.module.css";
import appStyle from "../../App.module.css";
import DeliveryIcon from "../../assets/icons/deliveryIcon.svg";

const About = () => {
  return (
    <div className={styles.aboutSection}>
      <h1 className={appStyle.h1Desktop}>About Droppy</h1>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p className={appStyle.h2Desktop}>
            <img src={DeliveryIcon} />
            Deliver faster and safer with Droppy
          </p>
        </div>
        <div className={styles.paragraphContainer}>
          <p className={appStyle.bodyDesktop}>
            Frustrated by the manual process of using call centres to book
            delivery vehicles and the lack of transparency in pricing and
            availability, a group of problem solvers got together to create
            their own digital solution.
            <br />
            <br />
            Droppy was born to make on-demand delivery possible for everyone at
            the touch of a button. Through a single app, users can gain access
            to a wide fleet of suitable delivery vehicles helmed by professional
            drivers.
            <br />
            <br />
            Simply input the pick up and drop off locations, choose the vehicle
            type that you need and get matched with a nearby driver who’s ready
            to take the order.
            <br />
            <br />
            Droppy has become the strategic partner for businesses of all sizes
            to solve their last-mile delivery issues. From independent brick and
            mortar stories to restaurants, retail outlets and e-commerce
            companies, Droppy helps businesses from a wide array of industries
            to scale and outsource deliveries based on their needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
