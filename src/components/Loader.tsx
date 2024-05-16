import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader: React.FC = ({className}:{className?:string}) => {
  return (
    <div className={`h-screen w-full  flex justify-center items-center flex-col gap-5 ${className}`}>
      <AiOutlineLoading3Quarters color="gray " size={44} className="animate-spin" />
    </div>
  );
};

export default Loader;