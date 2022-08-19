import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRuler,
  faUser,
  faEnvelope,
  faPhone,
  faCar,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import appStyle from "../../App.module.css";
import Toggle from "../../components/Toggle";
import style from "./ProfilePage.module.css";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/Button";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import DefaultProfilePhoto from "../../components/DefaultProfilePhoto";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    vehicleInfo: {
      phoneNo: "",
      plateNo: "",
      width: "",
      length: "",
      height: "",
    },
  });

  const [isDriver, setIsDriver] = useState();
  const { id } = useParams();

  const onSuccess = (onReceived) => {
    setUserDetails(onReceived.result);
    // if (!isLocked) {
    //   notifier(onReceived.message);
    // }
    // onReceived.result.delivererIDs?.includes(localStorage.getItem("userID"))
    //   ? setIsAccepted(true)
    //   : setIsAccepted(false);
    // if (isSaved) setIsLocked(true);
  };

  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    `/profile/${id}`,
    onSuccess
  );

  useEffect(() => {
    localStorage.getItem("isDriver") === "true"
      ? setIsDriver(true)
      : setIsDriver(false);

    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return cancelFetch;
  }, []);

  let statusbar;
  if (error) {
    statusbar = <Error error={error} />;
  } else if (isLoading) {
    statusbar = (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div>
      <div className={style.ProfilePage}>
        <div className={style.topBar}></div>

        <div className={style.userDefault}>
          <h2 className={appStyle.h2Desktop}>Profile</h2>
          <DefaultProfilePhoto />
        </div>
        <div className={style.buttonDiv}>
          <div className={style.singleButton}>
            <Button>
              <FontAwesomeIcon icon={faPen} /> Edit
            </Button>
          </div>
          <div className={style.singleButton}>
            <Button class="buttonBorder">
              <FontAwesomeIcon icon={faTrashCan} /> Delete
            </Button>
          </div>
        </div>

        <div>
          <div className={style.allDetails}>
            <div className={style.userInfo}>
              <div className={style.details}>
                <h5 className={appStyle.boldBodyDesktop}>Personal Details</h5>
              </div>
              <div className={style.infoLine}>
                <FontAwesomeIcon icon={faUser} />
                <p className={appStyle.bodyDesktop}>First Name: </p>
                <div className={style.results}>
                  <p className={appStyle.bodyDesktop}>
                    {userDetails.firstName}
                  </p>
                </div>
              </div>
              <div className={style.infoLine}>
                <FontAwesomeIcon icon={faUser} />
                <p className={appStyle.bodyDesktop}>Last Name: </p>
                <div className={style.results}>
                  <p className={appStyle.bodyDesktop}>{userDetails.lastName}</p>
                </div>
              </div>
              <div className={style.infoLine}>
                <FontAwesomeIcon icon={faEnvelope} />
                <p className={appStyle.bodyDesktop}>Email: </p>
                <div className={style.results}>
                  <p className={appStyle.bodyDesktop}>{userDetails.email}</p>
                </div>
              </div>
            </div>
            {isDriver && (
              <div className={style.driverInfo}>
                <div className={style.details}>
                  <h5 className={appStyle.boldBodyDesktop}>Vehicle Details</h5>
                </div>
                <div className={style.infoLine}>
                  <FontAwesomeIcon icon={faPhone} />
                  <p className={appStyle.bodyDesktop}>Phone: </p>
                  <div className={style.results}>
                    <p className={appStyle.bodyDesktop}>
                      {userDetails.vehicleInfo.phoneNo}
                    </p>
                  </div>
                </div>
                <div className={style.infoLine}>
                  <FontAwesomeIcon icon={faCar} />
                  <p className={appStyle.bodyDesktop}>Plate Number: </p>
                  <div className={style.results}>
                    <p className={appStyle.bodyDesktop}>
                      {userDetails.vehicleInfo.plateNo}
                    </p>
                  </div>
                </div>
                <div className={style.infoLine}>
                  <FontAwesomeIcon icon={faRuler} />
                  <p className={appStyle.bodyDesktop}>Width: </p>
                  <div className={style.results}>
                    <p className={appStyle.bodyDesktop}>
                      {userDetails.vehicleInfo.width}
                    </p>
                  </div>
                </div>
                <div className={style.infoLine}>
                  <FontAwesomeIcon icon={faRuler} />
                  <p className={appStyle.bodyDesktop}>Height: </p>
                  <div className={style.results}>
                    <p className={appStyle.bodyDesktop}>
                      {userDetails.vehicleInfo.height}
                    </p>
                  </div>
                </div>
                <div className={style.infoLine}>
                  <FontAwesomeIcon icon={faRuler} />
                  <p className={appStyle.bodyDesktop}>Length: </p>
                  <div className={style.results}>
                    <p className={appStyle.bodyDesktop}>
                      {userDetails.vehicleInfo.length}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={style.toggle}>
            <p className={appStyle.boldBodyDesktop}>Driver mode</p>
            <Toggle />
          </div>
        </div>
        {statusbar}
      </div>
    </div>
  );
};

export default ProfilePage;
