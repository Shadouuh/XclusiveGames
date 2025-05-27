import React from 'react';
import ProfileCard from './ProfileCard';

const ProfileList = ({ profiles }) => {
  return (
    <div className="profile-grid">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileList;
