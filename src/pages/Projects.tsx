import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects, getTags } from "../services/projectsApi";
import ProjectCard from "../components/ProjectCard";
import { IoClose } from "react-icons/io5";
import ProjectsWrapper from "../components/ProjectsWrapper";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { useAccountStore } from "../store";
import ProjectTypesFilter from "../components/ProjectTypesFilter";
import DeadlineFilter from "../components/DeadlineFilter";
import StarRatingFilter from "../components/StarRatingFilter";
import ProjectCard2 from "../components/ProjectCard2";
import ProjectTitleFilter from "../components/ProjectTitleFilter";
import ProjectOrderingFilter from "../components/ProjectOrderingFilter";


const Projects: React.FC = () => {
  const userAccount = useAccountStore((state) => state.account);

  const crsfToken = useAccountStore((state) => state.csrfToken);

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState(2);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [ordering,setOrdering]=useState<string>("");


  const searchParams= {
paramsFilter:{
  limit:limit.toString(),
 ordering:ordering.toString(),
offset:(currentPage-1)*limit
},
keywordFilter:{ title:searchKeyword}
  };


  const {
    data: projects,
    isLoading:isProjectListLoading,
    isFetching:isProjectListFetching,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => {
      return getAllProjects(searchParams);
    },
    queryKey: ["projects", searchParams.paramsFilter],
    refetchOnWindowFocus: false,
  });

  const {
    data: tags,
  } = useQuery({
    queryFn: () => {
      return getTags()
    },
    queryKey: ["tags", limit],
    refetchOnWindowFocus: false,
  });



  const searchKeywordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setSearchKeyword(value);
  };
const handleSearchOrdering=(e:React.ChangeEvent<HTMLInputElement>):void=>{
  const { value } = e.target;
  console.log(value)
setOrdering(value);
}

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
refetch();
  };


  return (
<div className=" mt-5 flex flex-col pb-20 w-full pl-12 h-screen  relative custom-scrollbar overflow-scroll  ">

<div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 max-w-[1400px] ">
  
      <div className="  flex flex-col gap-y-3 lg:sticky top-4 h-screen ">
      {userAccount && userAccount.role === "admin" && (
            <Link
              to={"/project/new"}
              className="px-2 py-2.5 text-center bg-blue-500 text-white font-semibold rounded-lg hover:opacity-85"
            >
              + Add new project
            </Link>
          )}
     
     <div className="rounded-lg border border-slate-300 p-5   overflow-x-hidden custom-scrollbar overflow-y-auto">
       
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
      <ProjectTitleFilter 
      searchKeyword={searchKeyword}
      isFetching={isProjectListFetching}
      searchKeywordHandler={searchKeywordHandler}  
      submitSearchKeywordHandler={submitSearchKeywordHandler}
      resetSearchFilterHandler={resetSearchFilterHandler}
      />
          <StarRatingFilter
            // selectedStars={selectedStars}
            // onChange={handleStarsChange}
          />
       {  tags&& tags.length>0 && <ProjectTypesFilter
          tags={tags}
            // selectedHotelTypes={selectedHotelTypes}
            // onChange={handleHotelTypeChange}
          />}
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
            {projects?.count} Projects Found
            {/* {search.destination ? ` in ${search.destination}` : ""} */}
           
          </span>
   <ProjectOrderingFilter
   ordering={ordering}
   handleSearchOrdering={handleSearchOrdering}
   />
        </div>
        {projects&&projects?.results.map((project) => (
          <ProjectCard2 key={project?.id} project={project} />
        ))}

{!isProjectListLoading &&(
              <Pagination
                onPageChange={(page) => setCurrentPage(page)}
                currentPage={currentPage}
                totalPageCount={parseInt(projects?.count / limit)}
              />
            )}
   
      </div>
    </div>
</div>
  );
};

export default Projects;
