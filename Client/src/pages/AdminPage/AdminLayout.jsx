import { Outlet } from "react-router-dom";
import AdminSidebar from './components/AdminSidebar.jsx';
import AdminNav from './components/AdminNav.jsx';
import './styles.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <AdminNav />
      </header>
      <main className="admin-main">
        <AdminSidebar />
        <div className="admin-content">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;