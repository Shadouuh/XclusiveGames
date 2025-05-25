import { useState, useEffect } from 'react';
import AddGameModal from './components/AddGameModal.jsx';
import EditGameModal from './components/EditGameModal.jsx';
import './GamesManagement.css';

const GamesManagement = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [filterBy, setFilterBy] = useState('all');

  // Datos de ejemplo - en producción vendría de una API
  useEffect(() => {
    const mockGames = [
      {
        id: 1,
        nombre: 'The Witcher 3',
        precio: 2500,
        stock: 50,
        desarrolladora: 'CD Projekt RED',
        generos: ['RPG', 'Aventura'],
        plataformas: ['PC', 'PlayStation', 'Xbox'],
        fechaLanzamiento: '2015-05-19',
        estado: 'activo'
      },
      {
        id: 2,
        nombre: 'Cyberpunk 2077',
        precio: 3000,
        stock: 25,
        desarrolladora: 'CD Projekt RED',
        generos: ['RPG', 'Acción'],
        plataformas: ['PC', 'PlayStation', 'Xbox'],
        fechaLanzamiento: '2020-12-10',
        estado: 'activo'
      }
    ];
    setGames(mockGames);
    setFilteredGames(mockGames);
  }, []);

  useEffect(() => {
    let filtered = games;

    if (searchTerm) {
      filtered = filtered.filter(game => 
        game.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.desarrolladora.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy !== 'all') {
      filtered = filtered.filter(game => game.estado === filterBy);
    }

    setFilteredGames(filtered);
  }, [searchTerm, filterBy, games]);

  const handleAddGame = (newGame) => {
    const gameWithId = { ...newGame, id: Date.now() };
    setGames([...games, gameWithId]);
    setShowAddModal(false);
  };

  const handleEditGame = (updatedGame) => {
    setGames(games.map(game => 
      game.id === updatedGame.id ? updatedGame : game
    ));
    setShowEditModal(false);
    setSelectedGame(null);
  };

  const handleDeleteGame = (gameId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      setGames(games.filter(game => game.id !== gameId));
    }
  };

  const openEditModal = (game) => {
    setSelectedGame(game);
    setShowEditModal(true);
  };

  return (
    <div className="games-management">
      <div className="games-header">
        <h1>Gestión de Juegos</h1>
        <button 
          className="add-game-btn"
          onClick={() => setShowAddModal(true)}
        >
          Agregar Juego
        </button>
      </div>

      <div className="games-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los juegos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>
      </div>

      <div className="games-table-container">
        <table className="games-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Desarrolladora</th>
              <th>Géneros</th>
              <th>Plataformas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.map(game => (
              <tr key={game.id}>
                <td className="game-name">{game.nombre}</td>
                <td className="game-price">${game.precio}</td>
                <td className="game-stock">{game.stock}</td>
                <td>{game.desarrolladora}</td>
                <td>
                  <div className="genres-tags">
                    {game.generos.map(genre => (
                      <span key={genre} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="platforms-tags">
                    {game.plataformas.map(platform => (
                      <span key={platform} className="platform-tag">{platform}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${game.estado}`}>
                    {game.estado}
                  </span>
                </td>
                <td>
                  <div className="actions-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => openEditModal(game)}
                      title="Editar"
                    >
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteGame(game.id)}
                      title="Eliminar"
                    >
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddGameModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddGame}
        />
      )}

      {showEditModal && selectedGame && (
        <EditGameModal
          game={selectedGame}
          onClose={() => {
            setShowEditModal(false);
            setSelectedGame(null);
          }}
          onSave={handleEditGame}
        />
      )}
    </div>
  );
};

export default GamesManagement;