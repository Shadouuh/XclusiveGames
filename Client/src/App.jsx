// Rutas
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Estilos
import './globals.css';
// Paginas
import Home from './pages/HomePage/Page.jsx';
import About from './pages/AboutPage/Page.jsx';
import AuthPage from './pages/AuthPage/Page.jsx';
import Cart from './pages/CartPage/Page.jsx';
import Catalog from './pages/CatalogPage/Page.jsx';
import Categories from './pages/CategoriesPage/Page.jsx';
import Developer from './pages/DeveloperPage/Page.jsx';
import Devs from './pages/DevsPage/Page.jsx';
import Favorites from './pages/FavoritesPage/Page.jsx';
import Game from './pages/GamePage/Page.jsx';
import Users from './pages/UserPage/Page.jsx';
import Profile from './pages/ProfilePage/Page.jsx';
import MarketPage from "./pages/MarketPage/Page.jsx";
import XCoinsPage from "./pages/XcoinsPage/Page.jsx";
// Layout
import Layout from './Layout.jsx';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas que no contiene el Layout */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Rutas que contiene el Layout */}
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />
          <Route path="/games" element={<Catalog />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/developers" element={<Devs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profiles" element={<Users />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/marketplace" element={<MarketPage />} />
          <Route path="/xcoins" element={<XCoinsPage />} />
          <Route path="/about" element={<About />} />

          {/* Ruta de Desarrolladora por ID */}
          <Route path="/developer/:id" element={<Developer />} />
          {/* Ruta de Juego por ID */}
          <Route path="/game/:id" element={<Game />} />
          {/* Ruta de perfil por ID */}
          <Route path="profile/:id" element={<Profile />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;