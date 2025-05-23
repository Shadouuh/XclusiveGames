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
const Nav = () => {
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
    </nav>
  );
};
export default Nav;
