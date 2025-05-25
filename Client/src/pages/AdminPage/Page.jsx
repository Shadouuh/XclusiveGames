import { Link } from 'react-router-dom';
import { LuGamepad2, LuUsers, LuPackage } from 'react-icons/lu';
import './styles.css';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <div className="admin-welcome">
        <h1>Panel de Administración</h1>
        <p>Bienvenido al sistema de gestión de XclusiveGames</p>
      </div>
      
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Juegos</span>
            <div className="stat-icon">
              <LuGamepad2 size={20} color="#667eea" />
            </div>
          </div>
          <div className="stat-value">1,247</div>
          <div className="stat-change">+12% este mes</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Usuarios Activos</span>
            <div className="stat-icon">
              <LuUsers size={20} color="#667eea" />
            </div>
          </div>
          <div className="stat-value">8,432</div>
          <div className="stat-change">+5% este mes</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Ventas</span>
            <div className="stat-icon">
            </div>
          </div>
          <div className="stat-value">$45,231</div>
          <div className="stat-change">+18% este mes</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Stock Total</span>
            <div className="stat-icon">
              <LuPackage size={20} color="#667eea" />
            </div>
          </div>
          <div className="stat-value">2,156</div>
          <div className="stat-change">-3% este mes</div>
        </div>
      </div>
      
      <div className="admin-quick-actions">
        <h3>Acciones Rápidas</h3>
        <div className="quick-actions-grid">
          <Link to="/admin/games" className="quick-action-btn">
            <LuGamepad2 size={18} />
            Gestionar Juegos
          </Link>
          
          <Link to="/admin/users" className="quick-action-btn">
            <LuUsers size={18} />
            Ver Usuarios
          </Link>
          
          <Link to="/admin/reports" className="quick-action-btn">
            Ver Reportes
          </Link>
          
          <Link to="/admin/inventory" className="quick-action-btn">
            <LuPackage size={18} />
            Revisar Inventario
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;