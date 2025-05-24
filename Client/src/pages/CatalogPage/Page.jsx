import React, { useState, useEffect } from 'react';
import { Games } from '../../exampleData/games.js';
import GameCard from '../../components/GameCard/GameCard.jsx';
import './styles.css';
import Searchbar from '../../components/Search/Searchbar.jsx';

const Catalog = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 15000]);

  useEffect(() => {
    setGames(Games);
    setFilteredGames(Games);
  }, []);

  useEffect(() => {
    filterGames();
  }, [searchTerm, selectedPlatforms, selectedGenres, priceRange]);

  const filterGames = () => {
    let filtered = [...games];

    if (searchTerm) {
      filtered = filtered.filter(game => 
        game.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter(game => 
        game.plataforma.some(platform => selectedPlatforms.includes(platform))
      );
    }

    if (selectedGenres.length > 0) {
      filtered = filtered.filter(game => 
        game.generos.some(genre => selectedGenres.includes(genre))
      );
    }

    filtered = filtered.filter(game => 
      game.precio >= priceRange[0] && game.precio <= priceRange[1]
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

  const allPlatforms = [...new Set(games.flatMap(game => game.plataforma))];
  const allGenres = [...new Set(games.flatMap(game => game.generos))];

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catálogo de Juegos</h1>
      
      <div className="catalog-filters">
        <div className="search-catalog">
        <Searchbar/>
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
              key={game.id}
              id={game.id}
              name={game.nombre}
              image={game.imagen}
              platform={game.plataforma[0]} 
              price={game.precio}
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