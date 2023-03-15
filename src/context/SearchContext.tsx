import { createContext, useContext, useState } from 'react';
import { useDebounce } from 'react-use';

type Children = {
  children: JSX.Element;
};

const searchContext = createContext('');

// use like useContext -> const { input, setInput } = useFavoriteContext();
export const useFavoriteContext = () => {
  const context = useContext(searchContext);
  if (context === undefined) {
    throw new Error('SearchContext should be within SearchContextProvider');
  }
  return context;
};

// use like Provider -> <SearchContextProvider> ... </SearchContextProvider>
const SearchContextProvider = ({ children }: Children) => {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  useDebounce(
    () => {
      setDebouncedInput(input);
    },
    1000,
    [input],
  );

  const value: any = { input, setInput, debouncedInput };

  return (
    <searchContext.Provider value={value}>{children}</searchContext.Provider>
  );
};

export default SearchContextProvider;
