import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Icons
import { LuGamepad } from "react-icons/lu";
import { LuCoins } from "react-icons/lu";
import { LuGithub } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
// Styles
import "./nav.css";
// Components 
import Searchbar from '../Search/Searchbar.jsx'
// Hooks
import useConfirmation from "../../hooks/useConfirmation.jsx";
import useNotification from "../../hooks/useNotification.jsx";

const Nav = () => {
  const { confirm } = useConfirmation();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    //habria que verificar que el token sea valido
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      setIsLogged(true);
    }
  }, [])

  const handleLogout = () => {
    confirm(
      "¿Estás seguro?",
      () => {
        localStorage.removeItem('user');
        setIsLogged(false);
        notify('Sesión cerrada', 'success');
        navigate('/');
      },
    );
  }

  return (
    <nav className="navbar">
      <div className="nav-title">
        <LuGamepad size={30} color="#FAFAFA" strokeWidth="1.4" />
        <h1>Xclusive Games</h1>
      </div>
      <div className="bar-resizer">
        <Searchbar />
      </div>
      <div className="nav-menu">
        <FaRegHeart size={18} color="#ccc9cb" strokeWidth="0.01" />
        <LuGithub size={18} color="#ccc9cb" strokeWidth="2.3" />
        <FaRegUser size={18} color="#ccc9cb" strokeWidth="0.01" />
        <div className="coins">
          <p>1250</p>
          <LuCoins size={18} color="#FAFAFA" strokeWidth="1.4" />
        </div>
      </div>
      <button onClick={isLogged ? handleLogout : () => navigate('/auth')}>
        {isLogged ? 'Cerrar Sesión' : 'Iniciar Sesión'}
      </button>
    </nav>
  );
};
export default Nav;
