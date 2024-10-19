import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="md:w-1/3 w-1/2 p-2 border rounded-3xl bg-neutral-950"
    />
  );
};

export default SearchBar;
