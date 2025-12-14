import React from 'react';

const Result = ({ result, onBackToDashboard, onPlayAgain, onLogout }) => {
  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100;
    
    if (percentage >= 90) return "Excellent! 🏆";
    if (percentage >= 80) return "Great job! 🎉";
    if (percentage >= 70) return "Good work! 👍";
    if (percentage >= 60) return "Not bad! 👌";
    return "Keep practicing! 💪";
  };

  const getScoreClass = (score, total) => {
    const percentage = (score / total) * 100;
    
    if (percentage >= 80) return "score-excellent";
    if (percentage >= 60) return "score-good";
    return "score-needs-improvement";
  };

  return (
    <div className="result-container">
      <div className="result-card">
        <h2>Game Complete!</h2>
        
        <div className={`score-display ${getScoreClass(result.score, result.totalQuestions)}`}>
          <div className="score-number">
            {result.score} / {result.totalQuestions}
          </div>
          <div className="score-percentage">
            {Math.round((result.score / result.totalQuestions) * 100)}%
          </div>
        </div>

        <div className="score-message">
          {getScoreMessage(result.score, result.totalQuestions)}
        </div>

        <div className="result-stats">
          <div className="stat-item">
            <span className="stat-label">Correct Answers:</span>
            <span className="stat-value correct">{result.correctAnswers}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Wrong Answers:</span>
            <span className="stat-value wrong">{result.wrongAnswers}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Accuracy:</span>
            <span className="stat-value">
              {Math.round((result.correctAnswers / result.totalQuestions) * 100)}%
            </span>
          </div>
        </div>

        <div className="result-actions">
          <button onClick={onPlayAgain} className="play-again-btn">
            Play Again
          </button>
          <button onClick={onBackToDashboard} className="back-dashboard-btn">
            View Dashboard
          </button>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>

        <div className="encouragement">
          <p>Your score has been saved to the leaderboard!</p>
          <p>Keep practicing to improve your English grammar skills! 📚</p>
        </div>
      </div>
    </div>
  );
};

export default Result;