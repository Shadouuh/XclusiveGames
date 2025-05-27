import './styles/SettingModal.css'
const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-option">Denunciar usuario</button>
        <button className="modal-option">Bloquear</button>
        <button className="modal-option">Silenciar</button>
        <button className="modal-option">Saber más</button>
        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default SettingsModal;