import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import images from "../constants/images"
import * as utils from "../utils/index"
import * as types from "../types/index"


interface IProps  {
  project:types.IProject;
  key:number;
  }

const ProjectCard2:React.FC<IProps> = ({key, project }) => {




    return (
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg px-8 py-6 gap-8">
        <div className="w-full h-auto">
          <img
            src={images.ProjectPlaceholderImage}
            className=" hidden  xl:flex lg:w-[300px] h-auto object-cover object-center"
          />
        </div>


        <div className="grid   grid-rows-[1fr_1fr_1fr]">
          <div className=" ">
            <div className="flex items-center">
              <span className="flex">
           
                  <AiFillStar className="fill-yellow-400" />
            
              </span>
              <span className="ml-1 text-sm">{project.visibility}</span>
            </div>
            <Link
              to={`/project/${project.id}`}
              className="text-2xl font-bold cursor-pointer"
            >
              <span className="   break-all">{project.title}</span>
            </Link>
          </div>
  
          <div className="flex flex-col justify-between md:flex-row">
            <div className="line-clamp-4 flex flex justify-between py-1 items-center border-b md:border-none md:flex-col">
                <span className="text-center font-semibold text-sm">Leader:</span>
          <div className="flex items-center gap-x-2">
          <img src={project?.owner?.profile?.url} alt="profile picture" className="w-9 h-auto  " />
          <span className="text-sm">{project?.owner?.first_name} {project?.owner?.last_name}</span>
     
          </div>
            </div>
            <div className="line-clamp-4 flex justify-between py-1 items-center  border-b  md:border-none md:flex-col">
                <span className="text-center font-semibold text-sm">Members</span>
                <span className=" px-2 py-1 rounded-lg text-sm  font-semibold">{project?.assignees.length}</span>
            </div>
            <div className="line-clamp-4  flex justify-between py-1 items-center  md:flex-col  md:border-none gap-3">
                <span className="bg-orange-100 w-fit px-2 py-1 rounded-lg text-sm text-orange-400 font-semibold">{project?.status}</span>
       <span className="text-sm font-semibold">{utils.daysUntilDeadline({createdAt:project?.created,deadline:project?.deadline})}</span>
            </div>
          </div>
  
          <div className="grid grid-cols-2 items-end whitespace-nowrap ">
            <div className="flex gap-1 items-center">
              {project.tags.slice(0, 3).map((tag) => (
                <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                  {tag.name}
                </span>
              ))}
              <span className="text-sm">
                {project.tags.length > 3 &&
                  `+${project.tags.length - 3} more`}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
             
              <Link
               to={`/project/${project.id}`}
                className="bg-blue-600 text-white h-full p-2 font-bold text-normal rounded-lg max-w-fit hover:bg-blue-500"
              >
                View More
              </Link>
            </div>
          </div>


          
        </div>
      </div>
    );
  };
  
  export default ProjectCard2;