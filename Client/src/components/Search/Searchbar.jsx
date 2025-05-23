// Styles
import "./searchbar.css";
// Icons
import { CiSearch } from "react-icons/ci";
const Searchbar = () => {
  return (
    <div className="searchbar">
      <button className="search-button">
        <CiSearch size={18} color="#FAFAFA" />
      </button>
      <input
        className="search-input"
        type="text"
        placeholder="Buscar Juegos..."
      />
    </div>
  );
};
export default Searchbar;
