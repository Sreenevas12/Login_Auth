import React from 'react';
import { Link } from 'react-router-dom';


function Navbar({ user, onLogin, onLogout }) {
  return (
    <nav className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="right-section">
        {user ? (
          <>
            <img src={user.picture} alt="profile" width={32} />
            <span>{user.name}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button onClick={onLogin}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
