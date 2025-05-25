import { useState } from 'react';
import { LuX, LuUpload, LuPlus } from 'react-icons/lu';
import SelectionModal from './SelectionModal.jsx';
import './AddGameModal.css';

const EditGameModal = ({ game, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('datos');
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [selectionType, setSelectionType] = useState('');
  const [selectionTitle, setSelectionTitle] = useState('');
  
  const [gameData, setGameData] = useState({
    id: game.id,
    nombre: game.nombre || '',
    precio: game.precio || '',
    stock: game.stock || '',
    descripcion: game.descripcion || '',
    fechaLanzamiento: game.fechaLanzamiento || '',
    desarrolladoras: game.desarrolladoras || [],
    editores: game.editores || [],
    generos: game.generos || [],
    plataformas: game.plataformas || [],
    idiomas: game.idiomas || [],
    imagenPortada: game.imagenPortada || null,
    capturas: game.capturas || [],
    estado: game.estado || 'activo'
  });

  // Datos de ejemplo para las selecciones (mismo que AddGameModal)
  const availableOptions = {
    desarrolladoras: [
      { id: 1, name: 'CD Projekt RED' },
      { id: 2, name: 'Rockstar Games' },
      { id: 3, name: 'Valve Corporation' },
      { id: 4, name: 'Bethesda Game Studios' },
      { id: 5, name: 'Ubisoft' }
    ],
    editores: [
      { id: 1, name: 'Electronic Arts' },
      { id: 2, name: 'Activision' },
      { id: 3, name: 'Sony Interactive Entertainment' },
      { id: 4, name: 'Microsoft Studios' },
      { id: 5, name: 'Take-Two Interactive' }
    ],
    generos: [
      { id: 1, name: 'Acción' },
      { id: 2, name: 'Aventura' },
      { id: 3, name: 'RPG' },
      { id: 4, name: 'Estrategia' },
      { id: 5, name: 'Simulación' },
      { id: 6, name: 'Deportes' },
      { id: 7, name: 'Carreras' },
      { id: 8, name: 'Puzzle' }
    ],
    plataformas: [
      { id: 1, name: 'PC' },
      { id: 2, name: 'PlayStation 5' },
      { id: 3, name: 'PlayStation 4' },
      { id: 4, name: 'Xbox Series X/S' },
      { id: 5, name: 'Xbox One' },
      { id: 6, name: 'Nintendo Switch' }
    ],
    idiomas: [
      { id: 1, name: 'Español' },
      { id: 2, name: 'Inglés' },
      { id: 3, name: 'Francés' },
      { id: 4, name: 'Alemán' },
      { id: 5, name: 'Italiano' },
      { id: 6, name: 'Portugués' },
      { id: 7, name: 'Japonés' },
      { id: 8, name: 'Coreano' }
    ]
  };

  const tabs = [
    { id: 'datos', label: 'Datos del Juego' },
    { id: 'extras', label: 'Datos Extras' },
    { id: 'imagenes', label: 'Imágenes' },
    { id: 'requisitos', label: 'Requisitos del Juego' }
  ];

  const handleInputChange = (field, value) => {
    setGameData(prev => ({ ...prev, [field]: value }));
  };

  const openSelectionModal = (type, title) => {
    setSelectionType(type);
    setSelectionTitle(title);
    setShowSelectionModal(true);
  };

  const handleSelectionSave = (selectedItems) => {
    setGameData(prev => ({ ...prev, [selectionType]: selectedItems }));
    setShowSelectionModal(false);
  };

  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === 'portada') {
      setGameData(prev => ({ ...prev, imagenPortada: files[0] }));
    } else {
      setGameData(prev => ({ ...prev, capturas: [...prev.capturas, ...files] }));
    }
  };

  const removeImage = (index, type) => {
    if (type === 'portada') {
      setGameData(prev => ({ ...prev, imagenPortada: null }));
    } else {
      setGameData(prev => ({
        ...prev,
        capturas: prev.capturas.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = () => {
    // Validación básica
    if (!gameData.nombre || !gameData.precio || !gameData.stock) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    onSave(gameData);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'datos':
        return (
          <div className="tab-content">
            <div className="form-group">
              <label>Nombre del Juego *</label>
              <input
                type="text"
                value={gameData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                placeholder="Ingresa el nombre del juego"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Precio *</label>
                <input
                  type="number"
                  value={gameData.precio}
                  onChange={(e) => handleInputChange('precio', e.target.value)}
                  placeholder="0"
                />
              </div>
              
              <div className="form-group">
                <label>Stock *</label>
                <input
                  type="number"
                  value={gameData.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Estado</label>
              <select
                value={gameData.estado}
                onChange={(e) => handleInputChange('estado', e.target.value)}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Descripción</label>
              <textarea
                value={gameData.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                placeholder="Describe el juego..."
                rows={4}
              />
            </div>
            
            <div className="form-group">
              <label>Fecha de Lanzamiento</label>
              <input
                type="date"
                value={gameData.fechaLanzamiento}
                onChange={(e) => handleInputChange('fechaLanzamiento', e.target.value)}
              />
            </div>
          </div>
        );
        
      case 'extras':
        return (
          <div className="tab-content">
            <div className="selection-group">
              <label>Desarrolladoras</label>
              <div className="selection-display">
                <div className="selected-items">
                  {gameData.desarrolladoras.map(dev => (
                    <span key={dev.id} className="selected-tag">{dev.name}</span>
                  ))}
                </div>
                <button 
                  type="button"
                  className="select-btn"
                  onClick={() => openSelectionModal('desarrolladoras', 'Seleccionar Desarrolladoras')}
                >
                  <LuPlus size={16} /> Seleccionar
                </button>
              </div>
            </div>
            
            <div className="selection-group">
              <label>Editores</label>
              <div className="selection-display">
                <div className="selected-items">
                  {gameData.editores.map(editor => (
                    <span key={editor.id} className="selected-tag">{editor.name}</span>
                  ))}
                </div>
                <button 
                  type="button"
                  className="select-btn"
                  onClick={() => openSelectionModal('editores', 'Seleccionar Editores')}
                >
                  <LuPlus size={16} /> Seleccionar
                </button>
              </div>
            </div>
            
            <div className="selection-group">
              <label>Géneros</label>
              <div className="selection-display">
                <div className="selected-items">
                  {gameData.generos.map(genre => (
                    <span key={genre.id} className="selected-tag">{genre.name}</span>
                  ))}
                </div>
                <button 
                  type="button"
                  className="select-btn"
                  onClick={() => openSelectionModal('generos', 'Seleccionar Géneros')}
                >
                  <LuPlus size={16} /> Seleccionar
                </button>
              </div>
            </div>
            
            <div className="selection-group">
              <label>Plataformas</label>
              <div className="selection-display">
                <div className="selected-items">
                  {gameData.plataformas.map(platform => (
                    <span key={platform.id} className="selected-tag">{platform.name}</span>
                  ))}
                </div>
                <button 
                  type="button"
                  className="select-btn"
                  onClick={() => openSelectionModal('plataformas', 'Seleccionar Plataformas')}
                >
                  <LuPlus size={16} /> Seleccionar
                </button>
              </div>
            </div>
            
            <div className="selection-group">
              <label>Idiomas</label>
              <div className="selection-display">
                <div className="selected-items">
                  {gameData.idiomas.map(lang => (
                    <span key={lang.id} className="selected-tag">{lang.name}</span>
                  ))}
                </div>
                <button 
                  type="button"
                  className="select-btn"
                  onClick={() => openSelectionModal('idiomas', 'Seleccionar Idiomas')}
                >
                  <LuPlus size={16} /> Seleccionar
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'imagenes':
        return (
          <div className="tab-content">
            <div className="image-section">
              <label>Imagen de Portada</label>
              <div className="image-upload-area">
                {gameData.imagenPortada ? (
                  <div className="image-preview">
                    <img 
                      src={typeof gameData.imagenPortada === 'string' 
                        ? gameData.imagenPortada 
                        : URL.createObjectURL(gameData.imagenPortada)
                      } 
                      alt="Portada" 
                    />
                    <button 
                      className="remove-image"
                      onClick={() => removeImage(0, 'portada')}
                    >
                      <LuX size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="upload-placeholder">
                    <LuUpload size={32} />
                    <span>Subir imagen de portada</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'portada')}
                      hidden
                    />
                  </label>
                )}
              </div>
            </div>
            
            <div className="image-section">
              <label>Capturas de Pantalla</label>
              <div className="screenshots-grid">
                {gameData.capturas.map((screenshot, index) => (
                  <div key={index} className="image-preview">
                    <img 
                      src={typeof screenshot === 'string' 
                        ? screenshot 
                        : URL.createObjectURL(screenshot)
                      } 
                      alt={`Captura ${index + 1}`} 
                    />
                    <button 
                      className="remove-image"
                      onClick={() => removeImage(index, 'capturas')}
                    >
                      <LuX size={16} />
                    </button>
                  </div>
                ))}
                
                <label className="upload-placeholder small">
                  <LuUpload size={24} />
                  <span>Agregar captura</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'capturas')}
                    hidden
                  />
                </label>
              </div>
            </div>
          </div>
        );
        
      case 'requisitos':
        return (
          <div className="tab-content">
            <div className="requirements-placeholder">
              <h3>Requisitos del Sistema</h3>
              <p>Esta sección estará disponible próximamente.</p>
              <p>Aquí se podrán configurar los requisitos mínimos y recomendados del juego.</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-game-modal">
        <div className="modal-header">
          <h2>Editar Juego: {game.nombre}</h2>
          <button className="close-btn" onClick={onClose}>
            <LuX size={20} />
          </button>
        </div>
        
        <div className="modal-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="modal-body">
          {renderTabContent()}
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button className="save-btn" onClick={handleSubmit}>
            Guardar Cambios
          </button>
        </div>
      </div>
      
      {showSelectionModal && (
        <SelectionModal
          title={selectionTitle}
          options={availableOptions[selectionType]}
          selectedItems={gameData[selectionType]}
          onClose={() => setShowSelectionModal(false)}
          onSave={handleSelectionSave}
        />
      )}
    </div>
  );
};

export default EditGameModal;