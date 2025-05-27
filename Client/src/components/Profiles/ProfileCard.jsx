"use client";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();
  const { name, username, avatar, bio } = profile;

  const handleCardClick = () => {
    navigate(`/profile/${username}`);
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    console.log(`${action} clicked for ${username}`);
  };

  return (
    <div className="profiles-card" onClick={handleCardClick}>
      <div className="card-blur"></div>
      <div className="card-blur"></div>
      <div className="card-header">
        <div className="card-banner"></div>
      </div>

      <div className="card-content">
        <div className="card-avatar-container">
          <img
            src={avatar || "/placeholder.svg"}
            alt={name}
            className="card-avatar"
          />
        </div>

        <div className="card-info">
          <h2 className="card-name">{name}</h2>
          <p className="card-username">@{username}</p>

          <div className="card-bio">
            <p className="bio-text">{bio}</p>
            {bio.length > 100 && <p className="bio-more">Ver más...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
