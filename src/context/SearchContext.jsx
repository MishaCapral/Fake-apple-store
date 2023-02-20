import { createContext, useContext, useState } from 'react';
import { useDebounce } from 'react-use';

const searchContext = createContext(null);

// use like useContext -> const { input, setInput } = useFavoriteContext();
export const useFavoriteContext = () => {
  const context = useContext(searchContext);
  if (context === undefined) {
    throw new Error('SearchContext should be within SearchContextProvider');
  }
  return context;
};

// use like Provider -> <SearchContextProvider> ... </SearchContextProvider>
const SearchContextProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  useDebounce(
    () => {
      setDebouncedInput(input);
    },
    1000,
    [input],
  );

  return (
    <searchContext.Provider value={{ input, setInput, debouncedInput }}>
      {children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;
