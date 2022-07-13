import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Header/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import { motion } from "framer-motion";
import styles from "./App.module.css";
import { useState } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div className={styles.container} animate={{ x: isOpen ? 240 : 0 }}>
      <Nav opened={openHandler} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
      </Routes>
    </motion.div>
  );
};

export default App;
