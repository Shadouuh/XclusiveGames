import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import './AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();
  
  const adminTabs = [
    {
      text: "Dashboard",
      path: "/admin",
    },
    {
      text: "Gestión de Juegos",
      path: "/admin/games",
    },
    {
      text: "Usuarios",
      path: "/admin/users",
    },
    {
      text: "Desarrolladoras",
      path: "/admin/developers",
    },
    {
      text: "Géneros",
      path: "/admin/genres",
    },
    {
      text: "Inventario",
      path: "/admin/inventory",
    },
    {
      text: "Reportes",
      path: "/admin/reports",
    },
    {
      text: "Configuración",
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Panel Administrativo</h2>
      </div>
      <nav className="admin-nav-menu">
        {adminTabs.map((tab, index) => (
          <Link 
            key={index} 
            to={tab.path} 
            className={`admin-nav-item ${
              location.pathname === tab.path ? 'active' : ''
            }`}
          >
            {tab.icon}
            <span className="admin-nav-text">{tab.text}</span>
          </Link>
        ))}
      </nav>
      <div className="admin-sidebar-footer">
        <p>© 2025 XclusiveGames Admin</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;