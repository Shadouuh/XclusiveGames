import React from "react";
import './styles/ShareModal.css'
const ShareModal = ({ onClose }) => {
  const shareUrl = "https://gamehub.com/review/123";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Enlace copiado al portapapeles");
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal-youtube">
        <div className="review-modal-header">
          <h2>Compartir</h2>
          <button className="review-close-button" onClick={onClose}>×</button>
        </div>

        <div className="review-share-icons">
          <button className="review-icon-btn twitter" title="Twitter">🐦</button>
          <button className="review-icon-btn facebook" title="Facebook">📘</button>
          <button className="review-icon-btn whatsapp" title="WhatsApp">📱</button>
          <button className="review-icon-btn email" title="Email">✉️</button>
        </div>

        <div className="review-copy-link-box">
          <input type="text" readOnly value={shareUrl} className="review-copy-input" />
          <button onClick={handleCopy} className="review-copy-btn">Copiar</button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
