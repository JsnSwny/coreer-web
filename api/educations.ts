import { server } from "@/config";
import { EducationRequest } from "@/interfaces/education.model";
import { getUserConfig } from "@/utils/getUserConfig";
import axios from "axios";

export const addEducation = async (data: EducationRequest) => {
  try {
    const response = await axios.post(`${server}/api/educations/`, data, getUserConfig());
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};

export const updateEducation = async (id: number, data: EducationRequest) => {
  try {
    const response = await axios.put(`${server}/api/educations/${id}/`, data, getUserConfig());
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};

export const deleteEducation = async (id: number) => {
  try {
    const response = await axios.delete(`${server}/api/educations/${id}/`, getUserConfig());
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};
