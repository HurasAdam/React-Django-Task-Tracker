import { Button } from "@/components/ui/button";
import { getTickets } from "@/features/ticket-api/ticket-api";
import React from "react";
import { LuGitCompare } from "react-icons/lu";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ImTicket } from "react-icons/im";

const Tickets = () => {
  const {
    data: tickets,
    error,
    isLoading,
  } = useQuery(["tickets"], () => getTickets());

  return (
    <main className="w-full h-full py-5 px-16 mx-auto my-12 custom-scrollbar overflow-scroll pb-20">
      <div className="flex flex-col gap-6 md:gap-0 ">
        <div className="flex justify-center gap-2 md:justify-start">
          <ImTicket className="w-10 h-10" />
          <h2 className="h2-bold md:h3-bold">Tickets</h2>
        </div>
        <div className="flex justify-center md:justify-end">
          <Button
            className="px-40 shad-button_primary md:px-2 lg:px-2"
            variant="ghost"
          >
            <Link to="/create-ticket">Add Ticket</Link>
          </Button>
        </div>
      </div>

      {tickets &&
        tickets?.results.map((ticket) => {
          return <div>{ticket.title}</div>;
        })}
    </main>
  );
};

export default Tickets;