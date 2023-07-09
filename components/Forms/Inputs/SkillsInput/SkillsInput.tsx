import TagSelector from "@/components/Auth/Onboarding/TagSelector/TagSelector/TagSelector";
import TagSelectorList from "@/components/Auth/Onboarding/TagSelector/TagSelectorList/TagSelectorList";
import { Skill } from "@/interfaces/language.model";
import globalStyles from "@/styles/globalStyles.module.scss";

interface SkillsInputProps {
	options: Skill[];
	selectedOptions: Skill[];
	setSelectedOptions: (skills: Skill[]) => void;
}

const SkillsInput = ({
	options,
	selectedOptions,
	setSelectedOptions,
}: SkillsInputProps) => {
	return (
		<>
			<div className={globalStyles.formGroup}>
				<label className={globalStyles.label}>Languages</label>
				<TagSelectorList>
					{options
						.filter((item) => item.category == "L")
						.map((option) => (
							<TagSelector
								key={option.id}
								title={option.name}
								active={selectedOptions.some((item) => item.id == option.id)}
								selectedOptions={selectedOptions}
								setSelectedOptions={setSelectedOptions}
								option={option}
							/>
						))}
				</TagSelectorList>
			</div>
			<div className={globalStyles.formGroup}>
				<label className={globalStyles.label}>Frameworks</label>
				<TagSelectorList>
					{options
						.filter((item) => item.category == "F")
						.map((option) => (
							<TagSelector
								key={option.id}
								title={option.name}
								active={selectedOptions.some((item) => item.id == option.id)}
								selectedOptions={selectedOptions}
								setSelectedOptions={setSelectedOptions}
								option={option}
							/>
						))}
				</TagSelectorList>
			</div>
			<div className={globalStyles.formGroup}>
				<label className={globalStyles.label}>Other</label>
				<TagSelectorList>
					{options
						.filter((item) => item.category == "O")
						.map((option) => (
							<TagSelector
								key={option.id}
								title={option.name}
								active={selectedOptions.some((item) => item.id == option.id)}
								selectedOptions={selectedOptions}
								setSelectedOptions={setSelectedOptions}
								option={option}
							/>
						))}
				</TagSelectorList>
			</div>
		</>
	);
};

export default SkillsInput;
