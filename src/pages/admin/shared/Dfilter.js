import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const filters = [
  {
    id: 1,
    item: "Today",
  },
  {
    id: 2,
    item: "This Month",
  },
  {
    id: 3,
    item: "This Year",
  },
];

const Dfilter = ({ selectedtag, setSelectedTag }) => {
  const [clickfilter, setClickfilter] = useState(false);

  const filterRef = useRef(null);

  const handleSelect = (tag) => {
    setSelectedTag(tag);
    setClickfilter(false);
  };

  const handleClickOutside = (e) => {
    if (!filterRef?.current?.contains(e.target)) {
      setClickfilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="filter">
      <span
        className="icon"
        data-bs-toggle="dropdown"
        onClick={() => setClickfilter(!clickfilter)}
        style={{ cursor: "pointer" }}
      >
        <BsThreeDots />
      </span>
      <ul
        className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow ${
          clickfilter ? "dropf show" : ""
        }`}
        ref={filterRef}
      >
        {filters.map((filter) => {
          return (
            <>
              <li key={filter?.id} onClick={() => handleSelect(filter?.item)}>
                <span className="dropdown-item">{filter?.item}</span>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Dfilter;
