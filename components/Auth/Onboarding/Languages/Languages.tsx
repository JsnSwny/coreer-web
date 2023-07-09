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
import { toast } from "react-toastify";

interface LanguagesProps {
	options: Skill[];
	defaultOptions: Skill[];
	updateKey: string;
}

const Languages = ({ options, defaultOptions, updateKey }: LanguagesProps) => {
	const { user, updateUser } = useAuth();
	const router = useRouter();
	const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			let onboarded = false;

			if (!user!.first_name || !user!.last_name) {
				toast.error("You have not completed the Personal Details section", {
					position: "bottom-left",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			} else if (!user!.current_level || user!.looking_for.length == 0) {
				toast.error("You have not completed the About You section", {
					position: "bottom-left",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			} else {
				onboarded = true;
			}
			await updateUser({
				[updateKey]: selectedOptions.map((item) => item.id),
				onboarded,
			});

			setLoading(false);

			if (onboarded) {
				router.push("/");
			}
		} catch {
			setLoading(false);
		}
	};

	return (
		<>
			{/* {loading && <LoadingOverlay />} */}
			<form onSubmit={handleSubmit}>
				<SkillsInput
					options={options}
					selectedOptions={selectedOptions}
					setSelectedOptions={setSelectedOptions}
				/>
				<Actions
					loading={loading}
					actionText={`Get Started`}
					// disabled={selectedOptions.length < 2}
				/>
			</form>
		</>
	);
};

export default Languages;
