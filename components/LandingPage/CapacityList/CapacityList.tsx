import {
	faUserAstronaut,
	faUserGraduate,
	faUserSecret,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import ProgressCard from "../ProgressCard/ProgressCard";
import styles from "./CapacityList.module.scss";

const CapacityList = () => {
	return (
		<ul className={styles.capacityList}>
			<ProgressCard
				title="Students"
				icon={faUserGraduate}
				currentNum={30}
				maxNum={60}
			/>
			<ProgressCard
				title="Professionals"
				icon={faUserAstronaut}
				currentNum={20}
				maxNum={30}
			/>
			<ProgressCard
				title="Recruiters"
				icon={faUserSecret}
				currentNum={5}
				maxNum={10}
			/>
			<ProgressCard title="Total" icon={faUsers} currentNum={55} maxNum={100} />
		</ul>
	);
};

export default CapacityList;
