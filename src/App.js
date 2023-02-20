import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import NotFound from './pages/notFound/NotFound';
import './scss/app.scss';
import SearchContextProvider from './context/SearchContext';

function App() {
  return (
    <SearchContextProvider>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchContextProvider>

  );
}

export default App;
