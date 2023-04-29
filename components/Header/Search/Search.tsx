import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log(search);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${search}`);
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
