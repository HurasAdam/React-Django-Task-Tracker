import React from "react";
import { RiCloseFill } from "react-icons/ri";

interface IProps{
    searchKeywordHandler:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    submitSearchKeywordHandler:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    resetSearchFilterHandler:()=>void
    isFetching:boolean;
    searchKeyword?:string;
}

const ProjectTitleFilter:React.FC<IProps> = ({searchKeyword,searchKeywordHandler,submitSearchKeywordHandler,resetSearchFilterHandler,isFetching}) => {
    
  
    return (
        <div className="border-b border-slate-300 pb-5 relative">
          <h4 className="text-md font-semibold mb-2">Title</h4>
         
            <label className="flex items-center space-x-2">
              <input
              value={searchKeyword}
              onChange={(e)=>searchKeywordHandler(e)}
                type="text"
                className="p-1.5 border rounded-md w-full"
               placeholder="filter by title"
            
              
              />
            <button type="button" onClick={resetSearchFilterHandler}>
              <RiCloseFill/>
            </button>
            </label>
        <div className="flex justify-end mt-1">
        <button 
        disabled={isFetching ||searchKeyword?.length===0}
        type="button"
        className="bg-blue-400 px-1 py-1 text-white border-none rounded-md text-sm disabled:bg-gray-300"
        onClick={(e)=>submitSearchKeywordHandler(e)}
        >Search
        </button>
        </div>
 
        </div>
      );
}

export default ProjectTitleFilter