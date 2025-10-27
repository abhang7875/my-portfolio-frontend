import React, { useState } from "react";
import "../css/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [active, setActive] = useState("Home");

  const navItems = [
    { name: "Home", icon: "fa-solid fa-house" },
    { name: "Learnings", icon: "fa-solid fa-file-lines" },
    { name: "Work", icon: "fa-solid fa-briefcase" },
    { name: "Contact", icon: "fa-solid fa-address-card" },
  ];

  return <h1> TEST </h1>;
};

export default Navbar;
