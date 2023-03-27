import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} type="text" placeholder="Search" />
      <FontAwesomeIcon icon={faSearch} className={styles.icon} />
    </div>
  );
};

export default Search;
