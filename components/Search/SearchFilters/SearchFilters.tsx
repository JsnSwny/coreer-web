import styles from "./SearchFilters.module.scss";

const SearchFilters = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Filter by:</h2>
      <form>
        <h3 className={styles.category}>Location</h3>
        <div className={styles.filterContainer}>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" name="location" value="new-york" />
            New York
          </label>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" name="location" value="los-angeles" />
            Los Angeles
          </label>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" name="location" value="chicago" />
            Chicago
          </label>
        </div>

        <h3 className={styles.category}>Language</h3>
        <div className={styles.filterContainer}>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" name="language" value="english" />
            English
          </label>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" name="language" value="spanish" />
            Spanish
          </label>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" name="language" value="french" />
            French
          </label>
        </div>

        <h3 className={styles.category}>Interest</h3>
        <div className={styles.filterContainer}>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" name="interest" value="art" />
            Art
          </label>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" name="interest" value="music" />
            Music
          </label>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" name="interest" value="sports" />
            Sports
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
