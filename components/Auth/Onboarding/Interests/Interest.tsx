import TagSelectorList from "../TagSelector/TagSelectorList/TagSelectorList";
import TagSelector from "../TagSelector/TagSelector/TagSelector";
import Actions from "../Actions/Actions";
import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { Interest } from "@/interfaces/interest.model";
import globalStyles from "@/styles/globalStyles.module.scss";
import InterestsInput from "@/components/Forms/Inputs/InterestsInput/InterestsInput";

interface InterestsProps {
	options: Interest[];
	defaultOptions: Interest[];
}

const Interests = ({ options, defaultOptions }: InterestsProps) => {
	const { user, updateUser } = useAuth();
	const router = useRouter();
	const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await updateUser({
			interests_id: selectedOptions.map((item) => item.id),
		});
		router.push("/onboarding/languages");
	};

	return (
		<form onSubmit={handleSubmit}>
			<InterestsInput
				options={options}
				selectedOptions={selectedOptions}
				setSelectedOptions={setSelectedOptions}
			/>
			<Actions
				actionText={`Next Step (${selectedOptions.length} of 6)`}
				// disabled={selectedOptions.length < 6}
			/>
		</form>
	);
};

export default Interests;
