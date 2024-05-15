import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { sidebarLinks } from "../constants";
import {
  Link,
  Switch,
  Route,
  Redirect,
  useLocation,
  NavLink,
} from "react-router-dom";


interface IProps{
  isMenuActive:boolean;
  toggleMobileMenuHandler:()=>void;
}

const LeftSideBar: React.FC<IProps> = ({isMenuActive,toggleMobileMenuHandler}) => {
  const { pathname } = useLocation();



if(isMenuActive){
    return (
      <nav
        className={
          "leftsidebar-hidden leftsidebar flex flex-col justify-between "
        }
      >

        <ul className="flex flex-col  ">
          {sidebarLinks.map(({ label, route, imgURL }) => {
            const isActive = pathname === route;
            return (
              <NavLink
                to={route}
                key={label}
                className={`flex gap-2 py-3 items-center leftsidebar-link group ${
                  isActive && "text-orange-600"
                }`}
              >
                <img className="w-5 h-auto" src={imgURL} alt={label} />
                <li>{label}</li>
              </NavLink>
            );
          })}
        </ul>
      </nav>
    );
  
  }
  if(!isMenuActive){
    return(
      <div className="absolute top-[17px] left-5">
        <button onClick={toggleMobileMenuHandler}>
          <RxHamburgerMenu className="w-6 h-auto text-slate-800"/>
        </button>
      </div>
    )
  }

};

export default LeftSideBar;
