// React
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// Icons
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
// Style
import style from "./ProfilePage.module.css";
import appStyle from "../../App.module.css";
// Component
import Toggle from "../../components/Toggle";
import Button from "../../components/Button";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import DefaultProfilePhoto from "../../components/DefaultProfilePhoto";
// Hook
import useFetch from "../../hooks/useFetch";
import NotifierContext from "../../context/NotifierContext";
import EditProfileForm from "./EditProfileForm";
import UserInfoContext from "../../context/UserInfoContext";

const ProfilePage = () => {
  const { setEmail, setName, setSurname, setVehicleInfo } =
    useContext(UserInfoContext);

  const newUserDetails = {
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
  };

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
  const [isChecked, setIsChecked] = useState();
  const [deleteHelper, setDeleteHelper] = useState(false);
  const [editHelper, setEditHelper] = useState(false);
  const { id } = useParams();
  const { notifier } = useContext(NotifierContext);

  // Check if the user's ID matches the profile
  if (id !== localStorage.getItem("userID")) {
    return (
      <div className={style.notYourProfile}>
        <h2 className={appStyle.h1Desktop}>
          The page you are trying to view does not exist.
        </h2>
      </div>
    );
  }

  const onSuccess = (onReceived) => {
    if (userDetails.email === "") {
      setUserDetails(onReceived.result);
    }

    if (!editHelper) {
      setName(newUserDetails.firstName);
      setSurname(newUserDetails.lastName);
      setEmail(newUserDetails.email);
      setVehicleInfo(newUserDetails.vehicleInfo);
    }

    notifier(onReceived.message);
    setEditHelper(false);
  };

  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    `/profile/${id}`,
    onSuccess
  );

  useEffect(() => {
    localStorage.getItem("isDriver") === "true"
      ? setIsDriver(true)
      : setIsDriver(false);
    if (id === localStorage.getItem("userID")) {
      performFetch({
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      return cancelFetch;
    }
  }, [isChecked]);

  useEffect(() => {
    isDriver ? setIsChecked(true) : setIsChecked(false);
  }, [isDriver, isChecked]);

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

  const handleToggle = (e) => {
    const value = e.target.checked;
    if (value) {
      localStorage.removeItem("isDriver");
      localStorage.setItem("isDriver", "true");
      setIsDriver(true);
    } else {
      localStorage.removeItem("isDriver");
      localStorage.setItem("isDriver", "false");
      setIsDriver(false);
    }
  };

  let deletePrompt = (
    <div className={style.deletePrompt}>
      <p className={appStyle.h1Desktop}>
        Are you sure you would like to delete your profile?
      </p>
      <div className={style.red}>
        <p className={appStyle.bodyDesktop}>This action cannot be undone</p>
      </div>

      <div className={style.buttonDiv}>
        <div className={style.singleButton}>
          <Button path="/" buttonHandler={() => deleteProfile()}>
            Delete
          </Button>
        </div>
        <div className={style.singleButton}>
          <Button buttonHandler={() => setDeleteHelper(false)}>Cancel</Button>
        </div>
      </div>
    </div>
  );

  const deleteHandler = () => {
    setDeleteHelper(true);
  };

  const deleteProfile = () => {
    performFetch({
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    localStorage.clear();
    window.reload();
    return cancelFetch;
  };

  const editHandler = () => {
    editHelper ? setEditHelper(false) : setEditHelper(true);
  };

  const editUserHandler = (user) => {
    newUserDetails.firstName = user.firstName;
    newUserDetails.lastName = user.lastName;
    newUserDetails.email = user.email;
    newUserDetails.vehicleInfo = user.vehicleInfo;

    performFetch({
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    setEditHelper(false);
    return cancelFetch;
  };

  return (
    <div>
      <div className={style.profilePage}>
        <div className={style.topBar}></div>
        <div className={style.userDefault}>
          <h2 className={appStyle.h2Desktop}>Profile</h2>
          <DefaultProfilePhoto />
        </div>
        <div className={style.buttonDiv}>
          <div className={style.singleButton}>
            <Button buttonHandler={editHandler}>
              <FontAwesomeIcon icon={faPen} /> {!editHelper ? "Edit" : "Cancel"}
            </Button>
          </div>
          <div className={style.singleButton}>
            <Button class="buttonBorder" buttonHandler={deleteHandler}>
              <FontAwesomeIcon icon={faTrashCan} /> Delete
            </Button>
          </div>
        </div>
        {deleteHelper ? deletePrompt : ""}
        <div className={style.toggle}>
          <p className={appStyle.boldBodyDesktop}>Driver mode</p>
          <Toggle isChecked={isChecked} handleToggle={handleToggle} />
        </div>
        <div>
          {!editHelper && (
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
                    <p className={appStyle.bodyDesktop}>
                      {userDetails.lastName}
                    </p>
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
              <div className={style.DriverInfoDiv}>
                {isDriver && (
                  <div className={style.driverInfo}>
                    <div className={style.details}>
                      <h5 className={appStyle.boldBodyDesktop}>
                        Vehicle Details
                      </h5>
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
            </div>
          )}
          {editHelper && (
            <EditProfileForm
              user={userDetails}
              onSaveDetails={editUserHandler}
            />
          )}
        </div>
        {statusbar}
      </div>
    </div>
  );
};

export default ProfilePage;
