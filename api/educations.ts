import axios from 'axios';
import { server } from '@/config';
import { WorkExperienceRequest } from '@/interfaces/work_experiences.model';
import { getUserConfig } from '@/utils/getUserConfig';
import { EducationRequest } from '@/interfaces/education.model';

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