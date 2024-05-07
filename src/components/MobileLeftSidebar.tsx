import React from "react"
import { sidebarLinks } from "../constants";
import { NavLink, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

interface IMobileLeftSidebar{
    isMobileMenuActive:boolean;
    toggleMobileMenuHandler:()=>void;
}
const MobileLeftSidebar:React.FC<IMobileLeftSidebar> = ({isMobileMenuActive,toggleMobileMenuHandler}) => {
    const { pathname } = useLocation();
  if(isMobileMenuActive){
    return (
<div className="w-full absolute top-12 h-full z-20">
<div className="bg-violet-300 w-full border-2  mx-auto h-fit z-100 ">
<div className='flex justify-end'>
    <button className='p-1 ' onClick={toggleMobileMenuHandler}>
        <IoMdClose className='w-7 h-auto text-white  hover:text-violet-600 transition-all'/>
    </button>
    </div>
<ul className="flex flex-col items-center ">
          {sidebarLinks.map(({ label, route, imgURL }) => {
            const isActive = pathname === route;
            return (
              <NavLink
              onClick={toggleMobileMenuHandler}
                to={route}
                key={label}
                className={`flex gap-2 py-3 px-10 w-full  items-center leftsidebar-link group ${
                  isActive && "bg-violet-100 "
                }`}
              >
                <img className="w-5 h-auto  " src={imgURL} alt={label} />
                <li>{label}</li>
              </NavLink>
            );
          })}
        </ul>
       
        </div>
</div>
  )
}
}

export default MobileLeftSidebar