import TagSelector from "@/components/Auth/Onboarding/TagSelector/TagSelector/TagSelector";
import TagSelectorList from "@/components/Auth/Onboarding/TagSelector/TagSelectorList/TagSelectorList";
import { Interest } from "@/interfaces/interest.model";
import globalStyles from "@/styles/globalStyles.module.scss";

interface InterestsInputProps {
	options: Interest[];
	selectedOptions: Interest[];
	setSelectedOptions: (skills: Interest[]) => void;
}

const InterestsInput = ({
	options,
	selectedOptions,
	setSelectedOptions,
}: InterestsInputProps) => {
	return (
		<>
			<div className={globalStyles.formGroup}>
				<label className={globalStyles.label}>Career Interests</label>
				<TagSelectorList>
					{options
						.filter((item) => item.interest_type == "C")
						.map((option) => (
							<TagSelector
								key={option.id}
								title={option.name}
								active={selectedOptions.some((item) => item.id == option.id)}
								selectedOptions={selectedOptions}
								setSelectedOptions={setSelectedOptions}
								option={option}
								disabled={selectedOptions.length > 5}
							/>
						))}
				</TagSelectorList>
			</div>
			<div className={globalStyles.formGroup}>
				<label className={globalStyles.label}>Personal Interests</label>
				<TagSelectorList>
					{options
						.filter((item) => item.interest_type == "P")
						.map((option) => (
							<TagSelector
								key={option.id}
								title={option.name}
								active={selectedOptions.some((item) => item.id == option.id)}
								selectedOptions={selectedOptions}
								setSelectedOptions={setSelectedOptions}
								option={option}
								disabled={selectedOptions.length > 5}
							/>
						))}
				</TagSelectorList>
			</div>
		</>
	);
};

export default InterestsInput;
