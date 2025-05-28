// Styles
import "./searchbar.css";
// Icons
import { CiSearch } from "react-icons/ci";

const Searchbar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="searchbar">
      <button className="search-button">
        <CiSearch size={18} color="#FAFAFA" />
      </button>
      <input
        className="search-bar-input"
        type="text"
        placeholder="Buscar Juegos..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Searchbar;
