import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Header/Nav";
import Home from "./pages/Home/Home";
import AddCar from "./pages/Signup/AddCar";
import Signup from "./pages/Signup/Signup";

// import UserList from "./pages/User/UserList";

import { motion } from "framer-motion";
import styles from "./App.module.css";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import CreateJobController from "./pages/Job/CreateJobController";
import Notifier from "./components/Notifier";
import JobDetails from "./pages/Job/JobDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserInfoContext from "./context/UserInfoContext";
import About from "./components/About/About";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [isDriver, setIsDriver] = useState(null);
  const { token } = useContext(UserInfoContext);

  useEffect(() => {
    setUser(localStorage.getItem("token"));
    localStorage.getItem("isDriver") === "true"
      ? setIsDriver(true)
      : setIsDriver(false);
  }, [token]);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  //Delete JobView temporary route
  return (
    <motion.div className={styles.container} animate={{ x: isOpen ? 240 : 0 }}>
      <Nav opened={openHandler} />
      <Notifier />
      <Routes>
        {!user && <Route path="/" element={<Home />} />}
        {!user && <Route path="/user/create" element={<Signup />}></Route>}
        <Route path="/user/create/add-car" element={<AddCar />} />
        <Route path="/login" element={<Login />} />
        {user && <Route path="/job/view/:id" element={<JobDetails />} />}
        {!user && <Route path="/login" element={<Login />} />}
        {user && !isDriver && (
          <Route path="/jobs/create" element={<CreateJobController />} />
        )}
        {user && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </motion.div>
  );
};

export default App;
