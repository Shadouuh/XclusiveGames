import { useNavigate } from "react-router-dom";
import './AdminNav.css';

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const handleBackToSite = () => {
    navigate('/');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-left">
        <h1>XclusiveGames Admin</h1>
      </div>
      
      <div className="admin-nav-right">
        <button className="admin-nav-btn" title="Notificaciones">
        </button>
        
        <button className="admin-nav-btn" title="Perfil">
        </button>
        
        <button 
          className="admin-nav-btn back-to-site" 
          onClick={handleBackToSite}
          title="Volver al sitio"
        >
          Volver al Sitio
        </button>
        
        <button 
          className="admin-nav-btn logout" 
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          Salir
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;