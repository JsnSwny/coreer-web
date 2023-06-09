import axios from "axios";
import { server } from "@/config";
import { WorkExperienceRequest } from "@/interfaces/work_experiences.model";
import { getUserConfig } from "@/utils/getUserConfig";
import { UserAnswerRequest } from "@/interfaces/question.model";

export const addUserAnswer = async (data: UserAnswerRequest) => {
  try {
    const response = await axios.post(
      `${server}/api/user-answers/`,
      data,
      getUserConfig()
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};

export const updateUserAnswer = async (id: number, data: UserAnswerRequest) => {
  try {
    const response = await axios.put(
      `${server}/api/user-answers/${id}/`,
      data,
      getUserConfig()
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};

export const deleteUserAnswer = async (id: number) => {
  try {
    const response = await axios.delete(
      `${server}/api/user-answers/${id}/`,
      getUserConfig()
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    // setLoading(false);
  }
};
