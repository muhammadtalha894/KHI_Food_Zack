import { IoFastFoodOutline, IoFastFoodSharp } from "react-icons/io5";
import { FiShoppingCart, FiLogIn } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGetuserQuery } from "../../redux/reducers/userReducer";

const Header = ({ Authenticated }) => {
  return (
    <nav>
      <motion.div initial={{ y: "-100%" }} whileInView={{ y: "0" }}>
        <IoFastFoodOutline />
      </motion.div>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/cart">
          <FiShoppingCart />
        </NavLink>
        <NavLink to={Authenticated ? "/me" : "Login"}>
          {Authenticated ? <FaUser /> : <FiLogIn />}
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
