import React from "react"

interface IProps{
    handleSearchOrdering:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    ordering:string;
}

const ProjectOrderingFilter:React.FC<IProps> = ({handleSearchOrdering,ordering}) => {
  return (
    <select
    value={ordering}
    onChange={(e) => handleSearchOrdering(e)}
    className="p-2 border rounded-md"
  >
    <option value="">Sort By</option>
    
    <option value="-created">
    Newest to Oldest 
    </option>
    <option value="created">
    Oldest to Newest 
    </option>
  </select>
  )
}

export default ProjectOrderingFilter