import { sidebarLinks } from "@/constants";
import { Link, NavLink, useLocation } from "react-router-dom";
import { INavLink } from "types";
import { Button } from "../button";
import { LuScroll } from "react-icons/lu";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const user = {
    id: 1,
    name: "Adam",
    role: "Admin",
    imageUrl: "",
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo_4.svg"
            alt="loto"
            width={45}
            height={45}
          />
          <p className="font-semibold ml-1 text-base">BugBard</p>
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounder-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">{user.role}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                  width={22}
                  height={22}
                    src={link.imgURL}
                    alt="link-label"
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
             
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => logout()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;