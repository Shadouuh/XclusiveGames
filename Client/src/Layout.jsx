import { Outlet } from "react-router-dom";
import Nav from './components/Navbar/Nav.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'

const Layout = () => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main style={{ display: "flex" }}>
        <Sidebar />
        <div className="router">
          <Outlet /> 
        </div>
      </main>
    </>
  );
}
export default Layout;