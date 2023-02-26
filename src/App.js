import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import NotFound from './pages/notFound/NotFound';
import './scss/app.scss';
import SearchContextProvider from './context/SearchContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ItemDetails from './pages/ItemDetails/ItemDetails';

function App() {
  return (
    <Provider store={store}>
      <SearchContextProvider>
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/item/:id" element={<ItemDetails />} />
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
