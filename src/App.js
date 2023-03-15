import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import NotFound from './pages/notFound/NotFound';
import './scss/app.scss';
import SearchContextProvider from './context/SearchContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ItemDetails from './pages/ItemDetails/ItemDetails';
import Categories from './pages/categories/Categories';

function App() {
  const { pathname } = useLocation();
  const home = pathname === '/'
  return (
    <Provider store={store}>
      <SearchContextProvider>
        <div className={home ? 'wrapperHome' : "wrapper"}>
          {!home && <Header />}
          <div className={home ? '' : "content"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:category" element={<Categories />} />
              <Route path="/:category/:id" element={<ItemDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContextProvider>
    </Provider>

  );
}

export default App;
