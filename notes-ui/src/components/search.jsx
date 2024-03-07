import React from "react";
// import { MdSearch } from "react-icons/md";

const Search = ({searchHandler}) => {
    return (
    <div className="search">
      {/* <MdSearch className="search-icones" size='1.3em'></MdSearch> */}
      <input type="text" placeholder="Search..." onChange={(e) => searchHandler(e.target.value)}/>
    </div>
  );
}

export default Search;