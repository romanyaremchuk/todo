import { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SideBarBaseData } from "./SideBarBaseData.tsx";
import { IconContext } from "react-icons";
import "./NavBar.css";

const NavBar = () => {
  const [sideBar, setSideBar] = useState(true);

  const showSideBar = () => {
    setSideBar((sideBar) => !sideBar);
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSideBar} />
          </Link>
        </div>

        <nav className={sideBar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li onClick={showSideBar} className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SideBarBaseData.map((item, index) => (
              <li key={index} className={item.elementClassName}>
                <Link to={item.path}>
                  <item.icon />
                  <span> {item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};
export default NavBar;
