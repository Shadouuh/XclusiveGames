import { useState, useEffect } from 'react';
import { LuX, LuSearch } from 'react-icons/lu';
import './SelectionModal.css';

const SelectionModal = ({ title, options, selectedItems, onClose, onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [tempSelected, setTempSelected] = useState([...selectedItems]);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const toggleSelection = (option) => {
    const isSelected = tempSelected.some(item => item.id === option.id);
    
    if (isSelected) {
      setTempSelected(tempSelected.filter(item => item.id !== option.id));
    } else {
      setTempSelected([...tempSelected, option]);
    }
  };

  const handleSave = () => {
    onSave(tempSelected);
  };

  const handleSelectAll = () => {
    setTempSelected([...filteredOptions]);
  };

  const handleClearAll = () => {
    setTempSelected([]);
  };

  return (
    <div className="selection-modal-overlay">
      <div className="selection-modal">
        <div className="selection-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            <LuX size={18} />
          </button>
        </div>
        
        <div className="selection-search">
          <div className="search-container">
            <LuSearch size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="selection-actions">
            <button className="action-btn" onClick={handleSelectAll}>
              Seleccionar Todo
            </button>
            <button className="action-btn" onClick={handleClearAll}>
              Limpiar Todo
            </button>
          </div>
        </div>
        
        <div className="selection-list">
          {filteredOptions.map(option => {
            const isSelected = tempSelected.some(item => item.id === option.id);
            return (
              <div
                key={option.id}
                className={`selection-item ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleSelection(option)}
              >
                <div className="selection-checkbox">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelection(option)}
                  />
                  <span className="checkmark"></span>
                </div>
                <span className="selection-name">{option.name}</span>
              </div>
            );
          })}
        </div>
        
        <div className="selection-footer">
          <div className="selected-count">
            {tempSelected.length} elemento(s) seleccionado(s)
          </div>
          <div className="selection-buttons">
            <button className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
            <button className="save-btn" onClick={handleSave}>
              Guardar Selección
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionModal;