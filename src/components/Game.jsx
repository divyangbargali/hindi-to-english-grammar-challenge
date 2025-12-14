import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import questionsData from '../data/questions.json';

const Game = ({ onGameComplete, onBackToDashboard }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Create difficulty-based question selection
    const easyQuestions = questionsData.slice(0, 33);  // First 33 questions (easy)
    const mediumQuestions = questionsData.slice(33, 66); // Next 33 questions (medium)
    const hardQuestions = questionsData.slice(66, 100); // Last 34 questions (hard)
    
    const selectedQuestions = [
      ...easyQuestions.sort(() => 0.5 - Math.random()).slice(0, 7),   // 7 easy
      ...mediumQuestions.sort(() => 0.5 - Math.random()).slice(0, 7), // 7 medium
      ...hardQuestions.sort(() => 0.5 - Math.random()).slice(0, 6)    // 6 hard
    ];
    
    // Shuffle options for each question to randomize correct answer position
    const questionsWithShuffledOptions = selectedQuestions.map(q => {
      const correctAnswer = q.options[q.correctIndex];
      const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
      const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
      
      return {
        ...q,
        options: shuffledOptions,
        correctIndex: newCorrectIndex
      };
    });
    
    setQuestions(questionsWithShuffledOptions);
  }, []);

  const startGame = () => {
    setGameStarted(true);
  };

  const handleAnswer = (selectedIndex, isCorrect) => {
    const newAnswer = {
      questionId: questions[currentQuestionIndex].id,
      selectedIndex,
      isCorrect
    };
    
    setAnswers([...answers, newAnswer]);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question or finish game
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game complete
      const finalScore = isCorrect ? score + 1 : score;
      onGameComplete({
        score: finalScore,
        totalQuestions: questions.length,
        correctAnswers: finalScore,
        wrongAnswers: questions.length - finalScore,
        answers: [...answers, newAnswer]
      });
    }
  };

  if (!gameStarted) {
    return (
      <div className="game-container">
        <div className="game-intro">
          <h2>Hindi to English Grammar Challenge</h2>
          <div className="game-rules">
            <h3>Game Rules:</h3>
            <ul>
              <li>You will be presented with 20 Hindi sentences</li>
              <li>Choose the most grammatically correct English translation</li>
              <li>Each correct answer gives you 1 point</li>
              <li>You can use hints without losing points</li>
              <li>Once you select an answer, you cannot change it</li>
            </ul>
          </div>
          <div className="game-actions">
            <button onClick={startGame} className="start-btn">Start Game</button>
            <button onClick={onBackToDashboard} className="back-btn">Back to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="loading">Loading questions...</div>;
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="progress">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="score">Score: {score}</div>
      </div>
      
      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default Game;