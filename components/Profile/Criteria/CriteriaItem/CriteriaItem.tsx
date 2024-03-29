import TagsList from "@/components/Tags/TagsList/TagsList";
import styles from "./CriteriaItem.module.scss";
import { Profile } from "@/interfaces/profile.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPencil } from "@fortawesome/free-solid-svg-icons";

interface Item {
	name: string;
	color: string;
	highlight: boolean;
}
interface CriteriaItemProps {
	title: string;
	items: Item[];
	openModal?: () => void;
	canEdit?: boolean;
}

const CriteriaItem = ({
	title,
	items,
	openModal,
	canEdit,
}: CriteriaItemProps) => {
	return (
		<li className={styles.criteriaItem}>
			<div className={styles.criteriaHeader}>
				<h2>{title}</h2>
				{canEdit && openModal && (
					<FontAwesomeIcon icon={faPencil} onClick={openModal} />
				)}
			</div>

			<TagsList
				tags={items.map((item: Item) => ({
					text: item.name,
					color: item.color,
					highlight: item.highlight,
				}))}
				className={styles.tags}
			/>
		</li>
	);
};

export default CriteriaItem;
