import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import ParticipantList from './components/ParticipantList';
import './App.css';

function App() {
  const [participants, setParticipants] = useState([]);
  const [activeTab, setActiveTab] = useState('register');

  const addParticipant = (participant) => {
    setParticipants((prev) => [...prev, participant]);
  };

  const isDuplicate = (email) => {
    return participants.some(
      (p) => p.email.toLowerCase() === email.toLowerCase()
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">◈</span>
            <span className="logo-text">WorkshopHub</span>
          </div>
          <p className="header-subtitle">Register for upcoming workshops</p>
        </div>
      </header>

      <main className="app-main">
        <div className="tab-bar">
          <button
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
          <button
            className={`tab-btn ${activeTab === 'participants' ? 'active' : ''}`}
            onClick={() => setActiveTab('participants')}
          >
            Participants
            {participants.length > 0 && (
              <span className="badge">{participants.length}</span>
            )}
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'register' ? (
            <RegistrationForm
              onRegister={addParticipant}
              isDuplicate={isDuplicate}
              onViewList={() => setActiveTab('participants')}
            />
          ) : (
            <ParticipantList participants={participants} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
