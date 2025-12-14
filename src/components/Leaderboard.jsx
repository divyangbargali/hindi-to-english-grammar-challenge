import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const Leaderboard = ({ currentUser, onBackToDashboard }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const data = storage.getLeaderboard();
    console.log('Leaderboard data:', data);
    console.log('All users:', storage.getUsers());
    setLeaderboard(data);
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  const getScoreClass = (score) => {
    if (score >= 18) return "score-gold";
    if (score >= 15) return "score-silver";
    if (score >= 12) return "score-bronze";
    return "score-regular";
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-card">
        <div className="leaderboard-header">
          <h2>🏆 Leaderboard</h2>
          <p>Top performers in Hindi to English Grammar Challenge</p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="no-scores">
            <p>No scores yet! Be the first to play and set a record! 🎯</p>
          </div>
        ) : (
          <div className="leaderboard-list">
            <div className="leaderboard-headers">
              <span className="rank-header">Rank</span>
              <span className="name-header">Player</span>
              <span className="score-header">Best Score</span>
            </div>
            
            {leaderboard.map((user, index) => (
              <div
                key={user.username}
                className={`leaderboard-item ${user.username === currentUser ? 'current-user' : ''}`}
              >
                <span className="rank">
                  {getRankIcon(index + 1)}
                </span>
                <span className="username">
                  {user.username}
                  {user.username === currentUser && <span className="you-indicator">(You)</span>}
                </span>
                <span className={`score ${getScoreClass(user.highestScore)}`}>
                  {user.highestScore}/20
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="leaderboard-actions">
          <button onClick={onBackToDashboard} className="back-btn">
            Back to Dashboard
          </button>
        </div>

        <div className="leaderboard-info">
          <p>💡 Tip: Scores are based on your highest performance out of 20 questions</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;