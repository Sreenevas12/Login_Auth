import React from 'react';

function Profile({ user }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <img src={user.picture} alt="Profile" />
    </div>
  );
}

export default Profile;
