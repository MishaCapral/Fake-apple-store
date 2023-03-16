import { createContext, useContext, useState } from 'react';
import { useDebounce } from 'react-use';

type ChildrenType = {
  children: JSX.Element;
};

type FavoriteContextType = {
  input?: string;
  setInput?: any;
  debouncedInput?: string;
};

const searchContext = createContext<FavoriteContextType | null>(null);

// use like useContext -> const { input, setInput } = useFavoriteContext();
export const useFavoriteContext = () => {
  const context = useContext(searchContext);
  if (context === undefined) {
    throw new Error('SearchContext should be within SearchContextProvider');
  }
  return context;
};

// use like Provider -> <SearchContextProvider> ... </SearchContextProvider>
const SearchContextProvider: React.FC<ChildrenType> = ({ children }) => {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  useDebounce(
    () => {
      setDebouncedInput(input);
    },
    1000,
    [input],
  );

  const value: FavoriteContextType = { input, setInput, debouncedInput };

  return (
    <searchContext.Provider value={value}>{children}</searchContext.Provider>
  );
};

export default SearchContextProvider;
