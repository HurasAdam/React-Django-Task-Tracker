import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTickets } from "../services/ticketsApi";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { IoClose } from "react-icons/io5";
import { useAccountStore } from "../store";
import DataGrid from "../components/DataGrid";

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
    isFetching,
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

  return (
    <div className="  common-container">
      <div className="w-full mx-auto  px-10   ">
        <div className="flex flex-col gap-4  justify-between  lg:pr-6 2xl:pr-12  ">
          <h1 className="h1-bold text-center sm:text-left sm:h2-bold mt-4">
            Tickets
          </h1>

          <div className="flex flex-col sm:flex-row justify-between gap-10 w-full  mb-6 ">
            {userAccount && userAccount.role === "admin" && (
              <Link
                to={"/ticket/new"}
                className="border-2 px-2 py-2.5 text-center bg-purple-500 text-white font-semibold rounded-lg hover:opacity-85"
              >
                + Add new ticket
              </Link>
            )}
            <div className="flex flex-col sm:flex-row gap-2 relative">
              <button
                disabled={searchKeyword.length < 1}
                onClick={resetSearchFilterHandler}
                className="absolute top-2 right-[27%] "
              >
                <IoClose
                  className="text-slate-300 cursor-pointer 
            rounded-full hover:bg-slate-100 hover:text-slate-500  w-7 h-auto transition-all duration-100 "
                />
              </button>
              <input
                onChange={searchKeywordHandler}
                className="placeholder:px-2 p-2 w-full rounded-lg mx-auto md:mx-0"
                placeholder="Ticket title..."
                type="text"
                value={searchKeyword}
              />
              <button
                onClick={submitSearchKeywordHandler}
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Filter
              </button>
            </div>
          </div>
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
  );
};

export default Tickets;
