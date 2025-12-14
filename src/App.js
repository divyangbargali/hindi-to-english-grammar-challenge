import React, { useState, useEffect } from 'react';
import { storage } from './utils/storage';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import Result from './components/Result';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    const user = storage.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
    storage.setCurrentUser(username);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    storage.logout();
    setCurrentUser(null);
    setCurrentView('login');
    setGameResult(null);
  };

  const handleGameComplete = (result) => {
    console.log('Game completed:', { user: currentUser, score: result.score });
    storage.updateUserScore(currentUser, result.score);
    console.log('Score updated, checking leaderboard:', storage.getLeaderboard());
    setGameResult(result);
    setCurrentView('result');
  };

  const handlePlayAgain = () => {
    setGameResult(null);
    setCurrentView('game');
  };

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} />;
      case 'register':
        return <Register onSwitchToLogin={() => setCurrentView('login')} />;
      case 'dashboard':
        return (
          <div className="dashboard">
            <div className="dashboard-header">
              <h1>Hindi to English Grammar Challenge</h1>
              <div className="user-info">
                <span>Welcome, {currentUser}!</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </div>
            <div className="dashboard-content">
              <button onClick={() => setCurrentView('game')} className="start-game-btn">
                Start New Game
              </button>
              <button onClick={() => setCurrentView('leaderboard')} className="leaderboard-btn">
                View Leaderboard
              </button>
            </div>
          </div>
        );
      case 'game':
        return <Game onGameComplete={handleGameComplete} onBackToDashboard={() => setCurrentView('dashboard')} />;
      case 'result':
        return (
          <Result 
            result={gameResult} 
            onBackToDashboard={() => setCurrentView('dashboard')}
            onPlayAgain={handlePlayAgain}
            onLogout={handleLogout}
          />
        );
      case 'leaderboard':
        return <Leaderboard currentUser={currentUser} onBackToDashboard={() => setCurrentView('dashboard')} />;
      default:
        return <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} />;
    }
  };

  return (
    <div className="App">
      {renderView()}
    </div>
  );
}

export default App;