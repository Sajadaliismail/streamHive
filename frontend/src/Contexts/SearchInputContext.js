import React, { createContext, useState } from "react";
export const SearchInputContext = createContext({
  search: '',
  setSearch: () => {}
});

const SearchInputContextProvider = ({ children }) => {
  const [search, setSearch] = useState('');

  return (
    <SearchInputContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchInputContext.Provider>
  );
};

export default SearchInputContextProvider;
