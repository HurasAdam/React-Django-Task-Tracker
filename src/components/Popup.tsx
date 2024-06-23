import { useMutation } from "@tanstack/react-query";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

interface IProps{
    isPopupOpen:boolean;
    setEmployeeEditPopup: (value: boolean) => void;
}

const Popup:React.FC<IProps> = ({isPopupOpen,closePopupHandler,popupContent,}) => {

  return (
    <>

{ isPopupOpen&& (
    <div className='popup'>

<div className='h-screen w-screen fixed top-0 left-0 bg-black/40 z-50 backdrop-blur-sm'>

<div className='fixed top-[28%] left-1/2 rounded-md -translate-x-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rouded-md duration-200 w-[360px]  sm:w-[450px]  md:w-[540px] '>

    {/* Header section */}
    <div className='flex items-center justify-end'>
<div>
    <IoCloseOutline 
    className='text-2xl cursor-pointer hover:text-orange-600 transition-all dark:text-gray-50'
    onClick={closePopupHandler}
    />
</div>
    </div>
    {/* Form section */}
<div className="px-2">
{popupContent}
</div>
</div>
</div>

    </div>
)}
    </>
  )
}

export default Popup