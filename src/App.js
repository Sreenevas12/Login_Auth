import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import Home from './pages/Home';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar user={user} onLogin={() => setShowModal(true)} onLogout={() => setUser(null)} />
      <LoginModal show={showModal} onClose={() => setShowModal(false)} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
