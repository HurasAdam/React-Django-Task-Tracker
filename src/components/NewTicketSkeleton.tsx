import React from "react";
import { PiTicketFill } from "react-icons/pi";
import Loader from "./Loader";

const NewTicketSkeleton:React.FC = () => {
    return(
        <div className="common-container h-fit relative ">
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl">
          <h1 className="pt-2 pb-10 h2-bold flex items-center justify-center gap-x-3 lg:justify-start lg:gap-x-2">
            <PiTicketFill className="w-12 h-auto lg:w-9 lg:h-auto" />
            New Ticket
          </h1>
    <div className="flex flex-col gap-10">
    <div>
    <span>Title</span>
    <div className="bg-slate-200 p-2">
    .
    </div>
    </div>
    
    <div>
    <span>Project</span>
    <div className="bg-slate-200 p-2">
    .
    </div>
    </div>
    
    <div>
    <span>Description</span>
    <div className="bg-slate-200 p-24">
    .
    </div>
    </div>
    
    <div>
    <span>Priority</span>
    <div className=" grid-row-5 gap-3 md:grid-cols-2 md:gap-3 lg:grid">
    {Array.from([".", ".", ".", "."]).map((element, index) => {
      return (
        <div key={index} className="font-bold bg-gray-200 text-sm flex gap-1 text-gray-700 cursor-pointer rounded p-4 mt-3 truncate md:mt-2">
          {element}
        </div>
      );
    })}
    </div>
    </div>
    
    <div>
    <span>Type</span>
    <div className=" grid-row-5 gap-3 md:grid-cols-2 md:gap-3 lg:grid">
    {Array.from([".", ".", ".", ""]).map((element, index) => {
      return (
        <div key={index} className="font-bold bg-gray-200 text-sm flex gap-1 text-gray-700 cursor-pointer rounded p-4 mt-3 truncate md:mt-2">
          {element}
        </div>
      );
    })}
    </div>
    </div>
    
    </div>
    
        </section>
        <Loader className="absolute top-0 left-0"/>
        </div>
      )
}

export default NewTicketSkeleton