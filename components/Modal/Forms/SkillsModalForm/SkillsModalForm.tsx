import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import AsyncSelect from "react-select/async";
import { server } from "@/config";
import axios from "axios";
import { School } from "@/interfaces/education.model";
import TagsList from "@/components/Tags/TagsList/TagsList";
import TagSelector from "@/components/Auth/Onboarding/TagSelector/TagSelector/TagSelector";
import { useEffect } from "react";
import TagSelectorList from "@/components/Auth/Onboarding/TagSelector/TagSelectorList/TagSelectorList";
import { Skill } from "@/interfaces/language.model";
import SkillsInput from "@/components/Forms/Inputs/SkillsInput/SkillsInput";

interface ModalFormProps {
	closeModal: () => void;
}

const SkillsModalForm = ({ closeModal }: ModalFormProps) => {
	const { user, updateUser } = useAuth();

	const [options, setOptions] = useState<Skill[]>([]);
	const [selectedOptions, setSelectedOptions] = useState(
		user ? user.languages : []
	);

	useEffect(() => {
		axios
			.get(`${server}/api/languages/`)
			.then((res) => {
				setOptions(res.data);
			})
			.catch((err) => {
				console.log("error");
				console.log(err.response);
			});
	}, []);

	const handleSave = () => {
		updateUser({
			languages_id: selectedOptions.map((item) => item.id),
		});
		closeModal();
	};

	return (
		<>
			<div className={globalStyles.modalBody}>
				<SkillsInput
					options={options}
					selectedOptions={selectedOptions}
					setSelectedOptions={setSelectedOptions}
				/>
			</div>
			<div className={globalStyles.modalFooter}>
				<Button text="Save" onClick={handleSave} />
			</div>
		</>
	);
};

export default SkillsModalForm;
