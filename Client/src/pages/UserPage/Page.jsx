"use client";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { profiles } from "../../exampleData/profilesData";
import CommentModal from "../../components/Profiles/Modals/CommentModal";
import SettingsModal from "../../components/Profiles/Modals/SettingsModal";
import ShareModal from "../../components/Profiles/Modals/ShareModal";
import CountUp from "../../components/Profiles/CountUp";
import {
  dummyGames,
  dummyReviews,
  dummyMarketplaceItems,
  dummySavedItems,
} from "../../exampleData/dummyData.js";
import "./styles.css";

const ProfileDetailPage = () => {
  const { username } = useParams();
  const profile = profiles.find((p) => p.username === username);

  const [activeTab, setActiveTab] = useState("games");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [likedReviews, setLikedReviews] = useState({});

  const handleCommentClick = (review) => {
    setSelectedReview(review);
    setActiveModal("comment");
    setModalOpen(true);
  };

  const handleShareClick = (review) => {
    setSelectedReview(review);
    setActiveModal("share");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveModal(null);
    setSelectedReview(null);
  };

  const handleCommentSubmit = (comment) => {
    console.log("Nuevo comentario:", comment);
    closeModal();
  };

  const toggleLike = (id) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!profile) {
    return (
      <div className="profile-not-found">
        <h2>Perfil no encontrado</h2>
        <p>El perfil que estás buscando no existe o ha sido eliminado.</p>
        <Link to="/" className="back-link">Volver a la página principal</Link>
      </div>
    );
  }

  const { name, avatar, banner, bio, stats, categories } = profile;

  const renderTabContent = () => {
    switch (activeTab) {
      case "games":
        return (
          <div className="games-grid">
            {dummyGames.map((game, index) => (
              <div
                key={game.id}
                className="game-card"
                style={{ "--card-index": index }}
              >
                <div className="game-image-container">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    className="game-cover"
                  />
                  <div className="game-hours">
                    <CountUp end={game.hoursPlayed} /> horas
                  </div>
                </div>
                <div className="game-info">
                  <h3 className="game-title">{game.title}</h3>
                  <div className="game-rating">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <span
                          key={i}
                          className={i < game.rating ? "star filled" : "star"}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-star-icon lucide-star"
                          >
                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                          </svg>
                        </span>
                      ))}
                    <span className="game-last-played">
                      Último juego: {game.lastPlayed}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "reviews":
        return (
          <div className="reviews-grid">
            {dummyReviews.map((review, index) => (
              <div
                key={review.id}
                className="review-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="review-header">
                  <img
                    src={review.gameImage || "/placeholder.svg"}
                    alt={review.gameTitle}
                    className="review-game-image"
                  />
                  <div className="review-game-info">
                    <h3 className="review-game-title">{review.gameTitle}</h3>
                    <div className="review-rating">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating ? "star filled" : "star"
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-star-icon lucide-star"
                            >
                              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                            </svg>
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                <p className="review-content">{review.content}</p>
                <div className="review-footer">
                  <span className="review-date">{review.date}</span>
                  <div className="review-actions">
                    <button
                      className={`review-action heart-button ${
                        likedReviews[review.id] ? "liked" : ""
                      }`}
                      onClick={() => toggleLike(review.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart-icon lucide-heart"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                      {review.likes + (likedReviews[review.id] ? 1 : 0)}
                    </button>
                    <button
                      className="review-action "
                      onClick={() => handleCommentClick(review)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-square-icon lucide-message-square"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      {review.comments}
                    </button>
                    <button
                      className="review-action"
                      onClick={() => handleShareClick(review)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-send-icon lucide-send"
                      >
                        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                        <path d="m21.854 2.147-10.94 10.939" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {activeModal === "comment" && (
              <CommentModal
                isOpen={modalOpen}
                onClose={closeModal}
                onSubmit={handleCommentSubmit}
                review={selectedReview}
              />
            )}

            {activeModal === "share" && (
              <ShareModal
                isOpen={modalOpen}
                onClose={closeModal}
                onSubmit={handleCommentSubmit}
                review={selectedReview}
              />
            )}
          </div>
        );
      case "marketplace":
        return (
          <div className="marketplace-grid">
            {dummyMarketplaceItems.map((item, index) => (
              <div
                key={item.id}
                className="marketplace-item"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="item-image-container">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="item-image"
                  />
                  <div className="item-status">{item.status}</div>
                </div>
                <div className="item-info">
                  <div className="item-header">
                    <h3 className="item-title">{item.title}</h3>
                    <span className="item-price">
                      $
                      <CountUp
                        end={parseFloat(item.price.replace(/[^0-9.]/g, ""))}
                        duration={1500}
                      />
                    </span>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <div className="item-footer">
                    <span className="item-date">{item.date}</span>
                    <button className="item-action">🛒 Ver detalles</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "saved":
        return (
          <div className="saved-grid">
            {dummySavedItems.length > 0 ? (
              dummySavedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="saved-item"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="saved-image"
                  />
                  <div className="saved-info">
                    <h3 className="saved-title">{item.title}</h3>
                    <p className="saved-type">{item.type}</p>
                    <span className="saved-date">{item.savedDate}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-saved-items">
                <p>No hay elementos guardados</p>
                <button className="explore-button">Explorar contenido</button>
              </div>
            )}
          </div>
        );
      default:
        return <div>Contenido no disponible</div>;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-banner">
            <img src={banner || "../../assets/placeholder.svg"} alt="banner" />
          </div>
          <div className="profile-avatar-container">
            <img
              src={avatar || "../../assets/placeholder.svg"}
              alt={name}
              className="profile-avatar"
            />
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-info">
            <div className="profile-info-basic">
              <div className="profile-basic-info">
                <h1 className="profile-name">{name}</h1>
                <p className="profile-username">@{username}</p>
                <p className="profile-bio">{bio}</p>

                <div className="profile-categories">
                  {Object.entries(categories).map(([category, options]) => (
                    <div key={category} className="category-group">
                      <span className="category-label">{category}:</span>
                      {options.map((option) => (
                        <span key={option} className="category-badge">
                          {option}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="profile-stats">
                  <div className="stat-item">
                    <CountUp end={stats.followers} />
                    <span className="stat-label">Seguidores</span>
                  </div>
                  <div className="stat-item">
                    <CountUp end={stats.following} />
                    <span className="stat-label">Siguiendo</span>
                  </div>
                  <div className="stat-item">
                    <CountUp end={stats.games} />
                    <span className="stat-label">Juegos</span>
                  </div>
                  <div className="stat-item">
                    <CountUp end={stats.reviews} />
                    <span className="stat-label">Reseñas</span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="action-button primary">Seguir</button>
                <button className="action-button secondary">
                  Enviar mensaje
                </button>
                <button
                  className="profile-settings"
                  aria-label="Configuración"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  ...
                </button>
              </div>
            </div>
          </div>

          <div className="profile-tabs">
            <div className="tab-navigation">
              <button
                className={`tab-nav-button ${
                  activeTab === "games" ? "active" : ""
                }`}
                onClick={() => setActiveTab("games")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-gamepad-icon lucide-gamepad"
                >
                  <line x1="6" x2="10" y1="12" y2="12" />
                  <line x1="8" x2="8" y1="10" y2="14" />
                  <line x1="15" x2="15.01" y1="13" y2="13" />
                  <line x1="18" x2="18.01" y1="11" y2="11" />
                  <rect width="20" height="12" x="2" y="6" rx="2" />
                </svg>
                Juegos
              </button>
              <button
                className={`tab-nav-button ${
                  activeTab === "reviews" ? "active" : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-star-icon lucide-star"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
                Reseñas
              </button>
              <button
                className={`tab-nav-button ${
                  activeTab === "marketplace" ? "active" : ""
                }`}
                onClick={() => setActiveTab("marketplace")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>{" "}
                Marketplace
              </button>
              <button
                className={`tab-nav-button ${
                  activeTab === "saved" ? "active" : ""
                }`}
                onClick={() => setActiveTab("saved")}
              >
                <svg
                  aria-label=""
                  className="x1lliihq x1n2onr6 x5n08af"
                  fill="currentColor"
                  height="12"
                  role="img"
                  viewBox="0 0 24 24"
                  width="12"
                >
                  <title></title>
                  <polygon
                    fill="none"
                    points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLineCap="round"
                    strokeLinejoin="round"
                  ></polygon>
                </svg>
                Guardados
              </button>
            </div>

            <div className="tab-content">{renderTabContent()}</div>
          </div>
        </div>
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default ProfileDetailPage;
