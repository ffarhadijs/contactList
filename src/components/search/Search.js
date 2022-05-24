import React from "react";
import styles from "./Search.module.css";

const Search = (props) => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        value={props.searchValue}
        onChange={props.searchHandler}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
