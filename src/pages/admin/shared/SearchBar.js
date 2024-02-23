import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  isHeader,
  searchInput,
  setSearchInput,
  handlesearch,
  setPage: setPageProp,
}) => {
  const [page, setPageState] = useState(1);

  const setPage = setPageProp || setPageState;
  return (
    <form
      className={`search-form d-flex align-items-center ${
        !isHeader ? "justify-content-end" : ""
      }`}
      //   method="POST"
      //   action="#"
    >
      <input
        type="text"
        name="query"
        placeholder="Search"
        title="Enter search keyword"
        style={{ width: `${isHeader ? "100%" : "65%"}` }}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setPage(1);
        }}
      />
      <button type="submit" title="Search" onClick={handlesearch}>
        <FiSearch />
      </button>
    </form>
  );
};

export default SearchBar;
