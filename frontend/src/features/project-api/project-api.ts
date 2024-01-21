import axios from "axios"
import clientApi from "../axios/axios"



export const getProjects = async()=>{


    const response = await clientApi.get("/task/projects/")
    return response.data
}

export const createProject = async(formData)=>{



const response = await clientApi.post("/task/projects/",formData,{
    xsrfHeaderName: "X-CSRFToken",
})
return response.data
}