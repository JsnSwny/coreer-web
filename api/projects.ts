import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectRequest } from "@/interfaces/project.model";
import { server } from "@/config";
import { Profile } from "@/interfaces/profile.model";

const convertDataToFormData = (data: ProjectRequest) => {
	const formData = new FormData();
	data.image && formData.append("image", data.image);
	data.video && formData.append("video", data.video);
	formData.append("title", data.title);
	data.description && formData.append("description", data.description);
	data.start_date && formData.append("start_date", data.start_date);
	data.end_date && formData.append("end_date", data.end_date);
	data.repo_link && formData.append("repo_link", data.repo_link);
	data.project_link && formData.append("project_link", data.project_link);
	data.languages_id &&
		formData.append("languages_id", data.languages_id.join(","));

	formData.append("user_id", data.user_id.toString());
	data.content && formData.append("content", data.content);
	return formData;
};

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
