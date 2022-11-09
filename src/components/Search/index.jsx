import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import "./style.css"

const Search = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [ active, setActive ] = useState(false);
  const [ query, setQuery ] = useState("");

  const handleSearch = (query) => {
    navigate("/s/" + query.trim());
  };

  const handleSearchClick = () => {
    if (!query) {
      setActive((oldActive) => {
        if (!oldActive && searchRef.current) searchRef.current.focus();
        return (!oldActive);
      });
    } else handleSearch(query);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value)
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") handleSearch(query);
  };

  return (
    <div className="search-container">
      <input
        type={"text"}
        ref={searchRef}
        value={query}
        onChange={handleSearchChange}
        onKeyUp={handleSearchKeyPress}
        className={"search" + (active ? " active" : "")}
      />
      <label className="search-button" onClick={handleSearchClick}>
        <RiSearchLine />
      </label>
    </div>
  );
};

export default Search;