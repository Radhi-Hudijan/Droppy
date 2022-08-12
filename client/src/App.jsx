import React from "react";
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
import CreateJobController from "./pages/job/CreateJobController";
import Notifier from "./components/Notifier";
import JobDetails from "./pages/Job/JobDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useEffect } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    setUser(localStorage.getItem("token"));
  }, [isLoggedin]);

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
        {user && <Route path="/job/create" element={<CreateJobController />} />}
        {user && <Route path="/job/view/:id" element={<JobDetails />} />}
        {!user && (
          <Route
            path="/login"
            element={<Login setIsLoggedin={setIsLoggedin} />}
          />
        )}
        {user && (
          <Route path="/jobs/create" element={<CreateJobController />} />
        )}
        {user && <Route path="/dashboard" element={<Dashboard />} />}
      </Routes>
      <Footer />
    </motion.div>
  );
};

export default App;
