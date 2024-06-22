import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTickets } from "../services/ticketsApi";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { IoClose } from "react-icons/io5";
import { useAccountStore } from "../store";
import DataGrid from "../components/DataGrid";
import ProjectTitleFilter from "../components/ProjectTitleFilter";
import StarRatingFilter from "../components/DynamicFilter";
import DeadlineFilter from "../components/DeadlineFilter";
import ProjectTypesFilter from "../components/ProjectTypesFilter";
import * as enums from "../types/enums"
import DynacimFilter from "../components/DynamicFilter";
import DynamicFilter from "../components/DynamicFilter";

const Tickets: React.FC = () => {
const [currentPage, setCurrentPage] = useState<number>(1);
const [searchKeyword, setSearchKeyword] = useState<string>("");
const [limit, setLimit] = useState<number>(1);
const [ordering,setOrdering]=useState<string>("");
const userAccount = useAccountStore((state) => state.account);



const searchParams= {
  limit:limit.toString(),
  ordering:ordering.toString(),
  offset:(currentPage-1)*limit,
  title:searchKeyword
    };

  const {
    data: tickets,
    isLoading:isTicketListLoading,
    isError,
    isFetching:isTicketListFetching,
    refetch,
  } = useQuery({
    queryFn: () => {
      return getAllTickets(searchParams);
    },
    queryKey: ["tickets", currentPage],
    refetchOnWindowFocus: false,
  });

  const searchKeywordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const resetSearchFilterHandler = (): void => {
    setSearchKeyword("");
    setCurrentPage(1);
  };

  const gridHeaders = [
    { key: "title", label: "Title" },
    { key: "status", label: "Status" },
    { key: "type", label: "Type" },
    { key: "created", label: "Created" },
  ]

  return (<div className=" mt-5 flex flex-col pb-20 w-full h-screen  relative custom-scrollbar overflow-scroll  ">

  <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 px-14 ">
    
        <div className="  flex flex-col gap-y-3 lg:sticky top-4 h-screen ">
        {userAccount && userAccount.role === "admin" && (
              <Link
                to={"/ticket/new"}
                className="px-2 py-2.5 text-center bg-blue-500 text-white font-semibold rounded-lg hover:opacity-85"
              >
                + Add new Ticket
              </Link>
            )}
       
       <div className="rounded-lg border border-slate-300 p-5   overflow-x-hidden custom-scrollbar overflow-y-auto">
         
          <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              Filter by:
            </h3>
        <ProjectTitleFilter 
        searchKeyword={searchKeyword}
        isFetching={isTicketListFetching}
        searchKeywordHandler={searchKeywordHandler}  
        submitSearchKeywordHandler={submitSearchKeywordHandler}
        resetSearchFilterHandler={resetSearchFilterHandler}
        />
            <DynamicFilter
            filterOptions={enums.Type}
            />
     <DynamicFilter
            filterOptions={enums.Status}
            />

         {/* {  tags&& tags.length>0 && <ProjectTypesFilter
            tags={tags}
              // selectedHotelTypes={selectedHotelTypes}
              // onChange={handleHotelTypeChange}
            />} */}
            <DeadlineFilter
              // selectedPrice={selectedPrice}
              // onChange={(value?: number) => setSelectedPrice(value)}
            />
          </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              {tickets?.count} Tickets Found
              {/* {search.destination ? ` in ${search.destination}` : ""} */}
             
            </span>
     {/* <ProjectOrderingFilter
     ordering={ordering}
     handleSearchOrdering={handleSearchOrdering}
     /> */}
          </div>
    
          <DataGrid 
     data={tickets?.results} 
     headers={gridHeaders}/>

  
  {!isTicketListLoading &&(
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={parseInt(tickets?.count / limit)}
                />
              )}
     
        </div>
      </div>
  </div>
    );

  
};

export default Tickets;
