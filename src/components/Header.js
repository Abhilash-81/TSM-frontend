import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown, DropdownHeader } from "flowbite-react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store?.user?.username);
  const email = useSelector((store) => store?.user?.email);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Navbar fluid rounded>
      <NavbarBrand>
        <Link to="/">
          <div className="flex">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Task Management App
            </span>
          </div>
        </Link>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <Link to="/">Home</Link>
        {!user && <Link to="/signup">Signup</Link>}
        {!user && <Link to="/api/v1/login">Login</Link>}
        {user && <div className="text-black">Username : {user}</div>}
        {user && <div className="text-black">Email : {email}</div>}
        {user && (
          <Link className="text-red-600" to="/logout">
            Logout
          </Link>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
