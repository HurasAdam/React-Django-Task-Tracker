import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import LeftSideBar from "./LeftSideBar";
import toast from "react-hot-toast";
import { validateSession } from "../services/userApi";
import { useQuery } from "@tanstack/react-query";
import { useAccountStore } from "../store";
import { useWindowSize } from "@uidotdev/usehooks";
import MobileLeftSidebar from "./MobileLeftSidebar";
import Popup from "./Popup";
import ReportBugForm from "../pages/forms/ReportBugForm";

const RootLayout: React.FC = () => {
  const setAccount = useAccountStore((state) => state.setAccount);
const setCsrfToken=useAccountStore((state)=>state.setCsrfToken);
  const account = useAccountStore((state)=>state.account);
  const navigate = useNavigate();

  console.log(account&& account?.is_configured)

  const isConfigured = true;

  if (account&& !account?.is_configured) {
    navigate("/onboarding");
  }

  const {
    data: session,
    isError,
    isLoading,
  } = useQuery({
    queryFn: () => {
      return validateSession();
    },
    onSuccess: (data) => {
      setAccount(data);
      setCsrfToken(data?.csrf_token);
    },
    onError: () => {
      navigate("/login");
    },
    queryKey: ["session"],
    retry: false,
  });
  const windowSize = useWindowSize();
  const [isMenuActive, setIsMenuActive] = useState(true);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState<boolean>(false);
const [isPopupOpen,setIsPopupOpen]=useState(false);
const [popupContent, setPopupContent] = useState();



const closePopupHandler= ()=>{
  setIsPopupOpen(false);
  setPopupContent(undefined);
}

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
      setIsMobileMenuActive(false);
    }
  }, [windowSize.width]);

const toggleMobileMenuHandler=():void=>{
  setIsMobileMenuActive((state)=>!state);
}


const renderContentComponent=(Component)=>{
  return <Component/>
}

  return (
    <div className="w-full flex flex-col  h-screen">
      <Header
     isPopupOpen={isPopupOpen}
     setIsPopupOpen={setIsPopupOpen}
     setPopupContent={setPopupContent}
     closePopupHandler={closePopupHandler}
      />
      <main className=" flex">
        <LeftSideBar isMenuActive={isMenuActive} toggleMobileMenuHandler={toggleMobileMenuHandler} />
    <MobileLeftSidebar isMobileMenuActive={isMobileMenuActive} toggleMobileMenuHandler={toggleMobileMenuHandler}/>
        <section className="flex flex-1 h-full overflow-scroll custom-scrollbar  ">
          <Outlet />
        </section>
      </main>
      <Popup isPopupOpen={isPopupOpen} popupContent={popupContent}closePopupHandler={closePopupHandler} />
    </div>
  );
};

export default RootLayout;
