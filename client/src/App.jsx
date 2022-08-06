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

import CreateJobController from "./pages/job/CreateJobController";
import Notifier from "./components/Notifier";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  //Delete JobView temporary route
  return (
    <motion.div className={styles.container} animate={{ x: isOpen ? 240 : 0 }}>
      <Nav opened={openHandler} />
      <Notifier />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/create" element={<Signup />}></Route>
        <Route path="/user/create/add-car" element={<AddCar />} />
        <Route path="/job/create" element={<CreateJobController />} />
      </Routes>
      <Footer />
    </motion.div>
  );
};

export default App;
