import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <img src={user.profilePicture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <p>Location: {user.location}</p>
    </div>
  );
};

export default UserProfile;