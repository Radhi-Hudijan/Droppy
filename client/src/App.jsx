import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import AddCar from "./pages/Signup/AddCar";
import Signup from "./pages/Signup/Signup";
// import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<Signup />}></Route>
        <Route path="/user/create/add-car" element={<AddCar />} />
      </Routes>
    </>
  );
};

export default App;
