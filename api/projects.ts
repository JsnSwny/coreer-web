import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectRequest } from "@/interfaces/project.model";
import { server } from "@/config";
import { Profile } from "@/interfaces/profile.model";

export const addProject = async (data: ProjectRequest) => {
  try {
    const userToken = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${userToken}`,
      },
    };

    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
    }

    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.start_date) {
      formData.append("start_date", data.start_date);
    }

    if (data.end_date) {
      formData.append("end_date", data.end_date);
    }
    formData.append("user", data.user.toString());
    formData.append("content", data.content);

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

    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
    }

    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.start_date) {
      formData.append("start_date", data.start_date);
    }

    if (data.end_date) {
      formData.append("end_date", data.end_date);
    }
    formData.append("user", data.user.toString());
    formData.append("content", data.content);

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
