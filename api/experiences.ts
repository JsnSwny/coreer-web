import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { ProjectRequest } from '@/interfaces/project.model';
import { server } from '@/config';
import { Profile } from '@/interfaces/profile.model';
import { WorkExperienceRequest } from '@/interfaces/work_experiences.model';
import { getUserConfig } from '@/utils/getUserConfig';

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