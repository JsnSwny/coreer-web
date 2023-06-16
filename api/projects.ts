import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectRequest } from "@/interfaces/project.model";
import { server } from "@/config";
import { Profile } from "@/interfaces/profile.model";

const convertDataToFormData = (data: ProjectRequest) => {
  const formData = new FormData();
  data.image && formData.append("image", data.image);
  formData.append("title", data.title);
  data.description && formData.append("description", data.description);
  data.start_date && formData.append("start_date", data.start_date);
  data.end_date && formData.append("end_date", data.end_date);
  formData.append("user", data.user.toString());
  data.content && formData.append("content", data.content);
  return formData;
}

export const addProject = async (data: ProjectRequest) => {
  try {
    const userToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${userToken}`,
      },
    };
    const formData = convertDataToFormData(data);

    const response = await axios.post(
      `${server}/api/projects/`,
      formData,
      config
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};

export const updateProject = async (id: number, data: ProjectRequest) => {
  try {
    const userToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${userToken}`,
      },
    };

    const formData = convertDataToFormData(data);

    const response = await axios.put(
      `${server}/api/projects/${id}/`,
      formData,
      config
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};

export const deleteProject = async (id: number) => {
  try {
    const userToken = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${userToken}`,
      },
    };

    const response = await axios.delete(
      `${server}/api/projects/${id}/`,
      config
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};
