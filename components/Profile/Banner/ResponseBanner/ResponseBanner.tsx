import styles from "./ResponseBanner.module.scss";

const ResponseBanner = () => {
  return (
    <ul className={styles.banner}>
      <li>
        <h4>Response rate</h4>
        <p>80%</p>
      </li>
      <li>
        <h4>Conversations</h4>
        <p>12</p>
      </li>
      <li>
        <h4>Last Active</h4>
        <p>2 Hours Ago</p>
      </li>
    </ul>
  );
};

export default ResponseBanner;
