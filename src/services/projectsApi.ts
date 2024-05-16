import axios from "axios";
import clientApi from "../axios";
import * as types from "../types/index"



export const getAllProjects = async (searchParams?:types.IProjectsSearchParams):Promise<types.IProjectsListResponse> => {



const queryParams = new URLSearchParams();

if(searchParams?.paramsFilter){
queryParams.append("ordering",searchParams.paramsFilter.ordering||"");
queryParams.append("limit",searchParams.paramsFilter.limit);
queryParams.append("offset",searchParams.paramsFilter.offset>0?searchParams.paramsFilter.offset:"");
}
if(searchParams?.keywordFilter){
  queryParams.append("title",searchParams.keywordFilter.title||"");
}



  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      `http://127.0.0.1:8000/task-tracker/v1/task/projects/?${queryParams}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const getProjectDetails = async ({ id }) => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      `http://127.0.0.1:8000/task-tracker/v1/task/projects/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const getTags = async () => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      "http://127.0.0.1:8000/task-tracker/v1/tags/",
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const getVisibilityOptions = async () => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      "http://127.0.0.1:8000/task-tracker/v1/task/dropdown-list/visibility",
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const createNewProject = async ({ csrfToken, formData }) => {
  try {
    // const config = {
    //   withCredentials: true,
    //   headers: {
    //     "X-CSRFToken": csrfToken,
    //   },
    // };

    const response = await clientApi({ csrfToken }).post(
      "http://127.0.0.1:8000/task-tracker/v1/task/projects/",
      formData
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const updateProject = async ({ csrfToken, formData }) => {
  try {
    const projectId = formData.get("id");

    const response = await clientApi({ csrfToken }).patch(
      `http://127.0.0.1:8000/task-tracker/v1/task/projects/${projectId}/`,
      formData
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};
