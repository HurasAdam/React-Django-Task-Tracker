import React from "react";
import ProjectForm from "./forms/ProjectForm";
import {
  getAllProjects,
  getProjectDetails,
  getTags,
  getVisibilityOptions,
  updateProject,
} from "../services/projectsApi";
import { FaEdit } from "react-icons/fa";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import TicketForm from "./forms/TicketForm";
import {
  getTicketDetails,
  getTicketPriorityOptions,
  getTicketTypeOptions,
  updateTicket,
} from "../services/ticketsApi";
import { getUsers } from "../services/userApi";

const EditTicket: React.FC = () => {
  const { id } = useParams();
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const { data: ticket, isLoading: isProjectLoading } = useQuery({
    queryFn: () => getTicketDetails({ id }),
    queryKey: ["ticket", id],
  });

  const { data: priorityOptions } = useQuery({
    queryFn: () => getTicketPriorityOptions(),
    queryKey: ["priorityOptions"],
  });
  const { data: users } = useQuery({
    queryFn: () => getUsers({ limit: 100 }),
    queryKey: ["users"],
  });

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => {
      return getAllProjects({ limit: 100 });
    },
    queryKey: ["projects"],
    refetchOnWindowFocus: false,
  });

  const { data: typeOptions } = useQuery({
    queryFn: () => getTicketTypeOptions(),
    queryKey: ["typeOptions"],
  });

  const { mutate } = useMutation({
    mutationFn: ({ formData }) => {
      return updateTicket({
        formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["ticket", id]);
      toast.success("Ticket updated sucessfully");
      navigate("/tickets");
    },
    onError: (error) => {
      toast.error("Something went wrong...");
    },
  });

  const handleSave = ({ formData }) => {
    mutate({ formData });
  };

  return (
    <div className="common-container h-fit ">
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl">
        <h1 className="pt-2 pb-10 h2-bold flex items-center justify-center gap-x-3 lg:justify-start lg:gap-x-2">
          <FaEdit className="w-12 h-auto lg:w-9 lg:h-auto" /> Edit Ticket
          <span className="text-lg text-slate-500 font-base ml-2">
            I D: {id}
          </span>
        </h1>

        {ticket && projects && typeOptions && users && priorityOptions && (
          <TicketForm
            ticket={ticket}
            projects={projects?.results}
            priorityOptions={priorityOptions}
            users={users?.results}
            typeOptions={typeOptions}
            handleSave={handleSave}
          />
        )}
      </section>
    </div>
  );
};

export default EditTicket;
