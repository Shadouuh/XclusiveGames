import './styles/CommentModal.css'
const CommentModal = ({ isOpen, onClose, review }) => {
  if (!isOpen || !review) return null;

  return (
    <div className="review-modal">
      <div className="modal-comment-review-post">
        <img src={review.avatarUrl} className="review-avatar" alt="avatar" />
        <div className="modal-comment-review-post-body">
          {/* Nombre y username del autor de la reseña */}
          <div className="modal-comment-review-author-header">
            <span className="modal-comment-review-name">{review.name}</span>
            <span className="modal-comment-review-username">@{review.username}</span>
          </div>

          <p className="modal-review-text">{review.content}</p>

          {review.imageUrl && (
            <img
              src={review.imageUrl}
              className="modal-comment-review-post-image"
              alt="imagen"
            />
          )}

          <div className="modal-comment-review-game-info">
            <img
              src={review.gameImageUrl}
              alt="Juego"
              className="modal-comment-review-game-img"
            />
            <span className="modal-comment-review-game-text">
              {review.name} hizo una reseña sobre{" "}
              <strong>{review.gameTitle}</strong>
            </span>
          </div>

          {/* Caja para escribir comentario */}
          <div className="modal-comment-review-comment-box">
            <div className="modal-comment-review-comment-tools">
              <div className="modal-comment-review-tools-left">
                <button className="modal-comment-review-icon-button" title="Emoji">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10..." />
                  </svg>
                </button>
                <button
                  className="modal-comment-review-icon-button"
                  title="Subir archivo"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <path d="M5 20h14v-2H5v2zm7-18l-5.5 5.5h4v6h3v-6h4L12 2z" />
                  </svg>
                </button>
              </div>

              <input
                type="text"
                className="modal-comment-review-hidden-input"
                placeholder="Escribe una respuesta..."
              />

              <button className="modal-comment-review-send-button" title="Enviar">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              </button>
            </div>
          </div>

          <button className="modal-comment-review-close-button" onClick={onClose}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
export default CommentModal;
