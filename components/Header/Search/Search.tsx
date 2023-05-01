import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string | string[]>("");

  useEffect(() => {
    if (router?.query?.query) {
      setSearch(router.query.query);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?query=${search}`);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </form>
      <FontAwesomeIcon icon={faSearch} className={styles.icon} />
    </div>
  );
};

export default Search;
