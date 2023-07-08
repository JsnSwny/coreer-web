import TagSelectorList from "../TagSelector/TagSelectorList/TagSelectorList";
import TagSelector from "../TagSelector/TagSelector/TagSelector";
import Actions from "../Actions/Actions";
import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import LoadingOverlay from "@/components/Layout/LoadingOverlay/LoadingOverlay";
import { Skill } from "@/interfaces/language.model";
import globalStyles from "@/styles/globalStyles.module.scss";
import SkillsInput from "@/components/Forms/Inputs/SkillsInput/SkillsInput";

interface LanguagesProps {
	options: Skill[];
	defaultOptions: Skill[];
	updateKey: string;
}

const Languages = ({ options, defaultOptions, updateKey }: LanguagesProps) => {
	const { user, updateUser, loading } = useAuth();
	const router = useRouter();
	const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await updateUser({
			[updateKey]: selectedOptions.map((item) => item.id),
			onboarded: true,
		});
		router.push("/");
	};

	return (
		<>
			{loading && <LoadingOverlay />}
			<form onSubmit={handleSubmit}>
				<SkillsInput
					options={options}
					selectedOptions={selectedOptions}
					setSelectedOptions={setSelectedOptions}
				/>
				<Actions
					actionText={`Get Started`}
					// disabled={selectedOptions.length < 2}
				/>
			</form>
		</>
	);
};

export default Languages;
