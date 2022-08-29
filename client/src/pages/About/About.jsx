import React, { useLayoutEffect, useEffect, useState } from "react";
import styles from "./About.module.css";
import appStyle from "../../App.module.css";
import DeliveryIcon from "../../assets/icons/deliveryIcon.svg";
import useFetch from "../../hooks/useFetch";

// Graph
import DemoPie from "../../components/Graphs/PieChart";
import DemoBar from "../../components/Graphs/BarChart";

const About = () => {
  const [availableJobAmount, setAvailableJobAmount] = useState();
  const [takenJobAmount, setTakenJobAmount] = useState();
  const [sendersAmount, setSendersAmount] = useState();
  const [deliverersAmount, setDeliverersAmount] = useState();

  const onSuccess = (onReceived) => {
    setAvailableJobAmount(onReceived.result.numOfAvailableJobs);
    setTakenJobAmount(onReceived.result.numOfTakenJobs);
    setSendersAmount(onReceived.result.numOfSenders);
    setDeliverersAmount(onReceived.result.numOfDeliverers);
  };

  const { performFetch, cancelFetch } = useFetch("/graphs/values", onSuccess);

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return cancelFetch;
  }, []);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
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
              Droppy was born to make on-demand delivery possible for everyone
              at the touch of a button. Through a single app, users can gain
              access to a wide fleet of suitable delivery vehicles helmed by
              professional drivers.
              <br />
              <br />
              Simply input the pick up and drop off locations, choose the size
              that you have and get matched with a nearby driver who’s ready to
              take the order.
              <br />
              <br />
              Droppy has become the strategic partner for businesses of all
              sizes to solve their last-mile delivery issues. From independent
              brick and mortar stories to restaurants, retail outlets and
              e-commerce companies, Droppy helps businesses from a wide array of
              industries to scale and outsource deliveries based on their needs.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.teamSection}>
        <header>
          <div className={styles.title}>
            <h3 className={appStyle.h2Desktop}>The creative Team</h3>
          </div>
          <div className={styles.content}>
            <h5 className={appStyle.boldBodyDesktop}>who we are</h5>
            <p className={appStyle.bodyDesktop}>
              We are team of creatively diverse. driven. innovative individuals
              working in various locations in the Netherland.
            </p>
          </div>
        </header>

        <main>
          <div className={styles.profile}>
            <figure data-value="tech lead" className={appStyle.bodyDesktop}>
              <img src="https://ca.slack-edge.com/T0EJTUQ87-U01A50MBL7J-ff88a4792fab-512" />
              <figcaption>Riccardo Bevilacqua</figcaption>
            </figure>
          </div>

          <div className={styles.profile}>
            <figure data-value="developer" className={appStyle.bodyDesktop}>
              <img src="https://avatars.githubusercontent.com/u/44026844?v=4" />
              <figcaption>Furkan ÇABUK</figcaption>
            </figure>
          </div>

          <div className={styles.profile}>
            <figure data-value="DevOps" className={appStyle.bodyDesktop}>
              <img src="https://avatars.githubusercontent.com/u/23367061?v=4" />
              <figcaption>Rob van Kruijsdijk</figcaption>
            </figure>
          </div>

          <div className={styles.profile}>
            <figure data-value="developer" className={appStyle.bodyDesktop}>
              <img src="https://avatars.githubusercontent.com/u/97112418?v=4" />
              <figcaption>Edward Abboud</figcaption>
            </figure>
          </div>

          <div className={styles.profile}>
            <figure data-value="developer" className={appStyle.bodyDesktop}>
              <img src="https://avatars.githubusercontent.com/u/87664868?v=4" />
              <figcaption>suleyman</figcaption>
            </figure>
          </div>

          <div className={styles.profile}>
            <figure data-value="developer" className={appStyle.bodyDesktop}>
              <img src="https://avatars.githubusercontent.com/u/93732690?v=4" />
              <figcaption>Radhi Hudijan</figcaption>
            </figure>
          </div>
        </main>
      </div>

      <div className={styles.graphSection}>
        <h1 className={appStyle.h1Desktop}>Latest Statistics</h1>
        <div className={styles.container}>
          <div className={styles.graphContainer}>
            <div className={styles.graph}>
              <DemoBar senders={sendersAmount} deliverers={deliverersAmount} />
            </div>
            <div className={styles.graph}>
              <DemoPie
                availableJobs={availableJobAmount}
                activeJobs={takenJobAmount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
