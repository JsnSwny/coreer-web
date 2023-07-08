import globalStyles from "@/styles/globalStyles.module.scss";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import { server } from "@/config";
import axios from "axios";
import TagSelector from "@/components/Auth/Onboarding/TagSelector/TagSelector/TagSelector";
import { useEffect } from "react";
import TagSelectorList from "@/components/Auth/Onboarding/TagSelector/TagSelectorList/TagSelectorList";
import { Interest } from "../../../../interfaces/interest.model";
import InterestsInput from "@/components/Forms/Inputs/InterestsInput/InterestsInput";

interface ModalFormProps {
	closeModal: () => void;
}

const InterestsModalForm = ({ closeModal }: ModalFormProps) => {
	const { user, updateUser } = useAuth();

	const [options, setOptions] = useState<Interest[]>([]);
	const [selectedOptions, setSelectedOptions] = useState(user?.interests ?? []);

	useEffect(() => {
		axios
			.get<Interest[]>(`${server}/api/interests`)
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
			interests_id: selectedOptions.map((item) => item.id),
		});
		closeModal();
	};
	return (
		<>
			<div className={globalStyles.modalBody}>
				<InterestsInput
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

export default InterestsModalForm;
