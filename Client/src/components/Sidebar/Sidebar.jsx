// Icons
import { LuCoins, LuGamepad, LuHeart, LuHouse, LuInfo, LuLayoutDashboard, LuShoppingBag, LuShoppingCart, LuUserRoundSearch } from "react-icons/lu";
import { RiHomeSmile2Line } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";
import { RiShoppingCartLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { MdInfoOutline } from "react-icons/md";
// Styles
import "./sidebar.css";
// Components
import { Link } from "react-router-dom";
const Sidebar = () => {
  const tabs = [
    {
      icon: <LuHouse size={17} color="snow" strokeWidth="1.5" />,
      text: "Inicio",
      redirection: "/",
    },
    {
      icon: <LuGamepad size={17} color="snow" strokeWidth="2" />,
      text: "Juegos",
      redirection: "/games",
    },
    {
      icon: <BiCategoryAlt size={17} color="snow" strokeWidth="0.1" />,
      text: "Categorias",
      redirection: "/categories",
    },
    {
      icon: <RiTeamLine size={17} color="snow" strokeWidth="0.01" />,
      text: "Desarrolladoras",
      redirection: "/developers",
    },
    {
      icon: <LuShoppingCart size={17} color="snow" strokeWidth="1.5" />,
      text: "Carrito",
      redirection: "/cart",
    },
    {
      icon: <LuUserRoundSearch size={17} color="snow" strokeWidth="1.5" />,
      text: "Perfiles",
      redirection: "/profiles",
    },
    {
      icon: <LuHeart size={17} color="snow" strokeWidth="1.5" />,
      text: "Favoritos",
      redirection: "/favorites",
    },
    {
      icon: <LuShoppingBag size={17} color="snow" strokeWidth="1.5" />,
      text: "Marketplace",
      redirection: "/marketplace",
    },
    {
      icon: <LuCoins size={17} color="snow" strokeWidth="1.5" />,
      text: "XCoins",
      redirection: "/xcoins",
    },
    {
      icon: <LuInfo size={17} color="snow" strokeWidth="1.5" />,
      text: "Sobre Nosotros",
      redirection: "/about",
    },
    {
      icon: <LuLayoutDashboard size={18} color="snow" strokeWidth="1.5" />,
      text: "Admin",
      redirection: "/admin",
    },
  ];

  return (
    <section className="sidebar-container">
      <div className="tabs-container">
        {tabs.map((tab, index) => (
          <Link className="tab-button" key={index} to={tab.redirection}>
            {tab.icon}
            <span className="tab-text">{tab.text}</span>
          </Link>
        ))}
      </div>
      <footer>
        <p className="footer-text">© 2025 Xclusive Games</p>
      </footer>
    </section>
  );
};

export default Sidebar;
