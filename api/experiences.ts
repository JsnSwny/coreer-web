import { server } from "@/config";
import { WorkExperienceRequest } from "@/interfaces/work_experiences.model";
import { getUserConfig } from "@/utils/getUserConfig";
import axios from "axios";

export const addExperience = async (data: WorkExperienceRequest) => {
  try {
    const response = await axios.post(`${server}/api/work-experiences/`, data, getUserConfig());
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};

export const updateExperience = async (id: number, data: WorkExperienceRequest) => {
  try {
    const response = await axios.put(
      `${server}/api/work-experiences/${id}/`,
      data,
      getUserConfig(),
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};

export const deleteExperience = async (id: number) => {
  try {
    const response = await axios.delete(`${server}/api/work-experiences/${id}/`, getUserConfig());
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};
