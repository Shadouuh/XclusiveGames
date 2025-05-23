// Icons
import { LuGamepad } from "react-icons/lu";
import { RiHomeSmile2Line } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";
import { RiShoppingCartLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { MdInfoOutline } from "react-icons/md";
// Styles
import "./Sidebar.css";
// Components
import { Link } from "react-router-dom";
const Sidebar = () => {
  const tabs = [
    {
      icon: <RiHomeSmile2Line size={20} color="snow" strokeWidth="0.1" />,
      text: "Inicio",
      redirection: "/",
    },
    {
      icon: <LuGamepad size={20} color="snow" strokeWidth="1.8" />,
      text: "Juegos",
      redirection: "/games",
    },
    {
      icon: <BiCategoryAlt size={20} color="snow" strokeWidth="0.01" />,
      text: "Categorias",
      redirection: "/categories",
    },
    {
      icon: <RiTeamLine size={20} color="snow" strokeWidth="0.01" />,
      text: "Desarrolladoras",
      redirection: "/developers",
    },
    {
      icon: <RiShoppingCartLine size={20} color="snow" strokeWidth="0.01" />,
      text: "Carrito",
      redirection: "/cart",
    },
    {
      icon: <FaRegUser size={20} color="snow" strokeWidth="0.01" />,
      text: "Perfil",
      redirection: "/profile",
    },
    {
      icon: <FaRegUser size={20} color="snow" strokeWidth="0.01" />,
      text: "Perfiles",
      redirection: "/profiles",
    },
    {
      icon: <FaRegHeart size={20} color="snow" strokeWidth="0.01" />,
      text: "Favoritos",
      redirection: "/favorites",
    },
    {
      icon: <MdInfoOutline size={20} color="snow" strokeWidth="0.01" />,
      text: "Marketplace",
      redirection: "/marketplace",
    },
    {
      icon: <MdInfoOutline size={20} color="snow" strokeWidth="0.01" />,
      text: "XCoins",
      redirection: "/xcoins",
    },
    {
      icon: <MdInfoOutline size={20} color="snow" strokeWidth="0.01" />,
      text: "Sobre Nosotros",
      redirection: "/about",
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
