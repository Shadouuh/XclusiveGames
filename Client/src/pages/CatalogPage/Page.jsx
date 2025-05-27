import './styles.css';
import { useState, useEffect } from 'react';




// IMPORTAR AXIOS DE SU CONFIGURACION NO DEL NODE_MODULES
import axios from '../../api/axios';




import GameCard from '../../components/GameCard/GameCard.jsx';
import Searchbar from '../../components/Search/Searchbar.jsx';

const Catalog = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [allGenres, setAllGenres] = useState([]);
  const [allPlatforms, setAllPlatforms] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/games/all');
        if (response.status === 200) {
          setGames(response.data.games);
          setFilteredGames(response.data.games);
        }
      } catch (error) {
        console.error('Error al obtener los juegos:', error);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    filterGames();
  }, [searchTerm, selectedPlatforms, selectedGenres, priceRange]);

  const filterGames = () => {
    let filtered = [...games];

    if (searchTerm) {
      filtered = filtered.filter(game => 
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter(game => {
        return game.platforms.some(platform => selectedPlatforms.includes(platform));
      });
    }

    if (selectedGenres.length > 0) {
      filtered = filtered.filter(game => {
        return game.genres.some(genre => selectedGenres.includes(genre));
      });
    }

    filtered = filtered.filter(game => 
      game.price >= priceRange[0] && game.price <= priceRange[1]
    );

    setFilteredGames(filtered);
  };

  const handlePlatformChange = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handlePriceChange = (e) => {
    setPriceRange([0, parseInt(e.target.value)]);
  };

  useEffect(() => {
    const fetchCategoriesGenres = async () => {
      try {
        let response = await axios.get('/api/all/genres');
        if (response.status === 200) {
          const res = response.data.results;
          const allGenres = [...new Set(res.map(r => r.name))];
          setAllGenres(allGenres);
        }
        response = await axios.get('/api/all/platforms');
        if (response.status === 200) {
          const res = response.data.results;
          const allPlatforms = [...new Set(res.map(r => r.name))];
          setAllPlatforms(allPlatforms);
        }
      }
      catch (error) {
        console.error('Error al obtener las categorías y géneros:', error);
      }
    };
    fetchCategoriesGenres();
  }, [])

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catálogo de Juegos</h1>
      
      <div className="catalog-filters">
        <div className="search-catalog">
          <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </div>
          
        
        
        <div className="filter-section">
          <div className="filter-group">
            <h3>Categorías</h3>
            <div className="filter-options">
              {allGenres.slice(0, 8).map(genre => (
                <button 
                  key={genre}
                  className={selectedGenres.includes(genre) ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => handleGenreChange(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h3>Plataformas</h3>
            <div className="filter-options">
              {allPlatforms.map(platform => (
                <button 
                  key={platform}
                  className={selectedPlatforms.includes(platform) ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => handlePlatformChange(platform)}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h3>Precio</h3>
            <div className="price-slider">
              <input 
                type="range" 
                min="0" 
                max="15000" 
                value={priceRange[1]} 
                onChange={handlePriceChange}
              />
              <div className="price-range">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="games-container">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <GameCard 
              key={game.id_game}
              id={game.id_game}
              name={game.name}
              image={game.image}
              platform={game.platforms} 
              price={game.price}
            />
          ))
        ) : (
          <div className="no-games">No se encontraron juegos con los filtros seleccionados</div>
        )}
      </div>
    </div>
  );
};

export default Catalog;