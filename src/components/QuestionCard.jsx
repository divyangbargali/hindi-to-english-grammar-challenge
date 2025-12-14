import React, { useState, useEffect } from 'react';
import HintBox from './HintBox';

const QuestionCard = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowHint(false);
    setAnswered(false);
  }, [question.id]);

  const handleOptionSelect = (index) => {
    if (!answered) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null && !answered) {
      setAnswered(true);
      const isCorrect = selectedOption === question.correctIndex;
    }
  };

  const handleNextQuestion = () => {
    if (answered) {
      const isCorrect = selectedOption === question.correctIndex;
      onAnswer(selectedOption, isCorrect);
    }
  };

  const getOptionClass = (index) => {
    if (!answered) {
      return selectedOption === index ? 'option selected' : 'option';
    }
    
    if (index === question.correctIndex) {
      return 'option correct';
    }
    
    if (selectedOption === index && index !== question.correctIndex) {
      return 'option wrong';
    }
    
    return 'option';
  };

  return (
    <div className="question-card">
      <div className="question-section">
        <h3 className="hindi-question">{question.hindiQuestion}</h3>
        <p className="instruction">Choose the most grammatically correct English translation:</p>
      </div>

      <div className="options-section">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={getOptionClass(index)}
            onClick={() => handleOptionSelect(index)}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}.</span>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>

      <div className="question-actions">
        <button
          onClick={() => setShowHint(!showHint)}
          className="hint-btn"
          disabled={answered}
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        
        {!answered ? (
          <button
            onClick={handleSubmit}
            className="submit-btn"
            disabled={selectedOption === null}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="submit-btn"
          >
            Next Question
          </button>
        )}
      </div>

      {showHint && <HintBox hint={question.grammarHint} />}

      {answered && (
        <div className="answer-feedback">
          {selectedOption === question.correctIndex ? (
            <div className="feedback correct-feedback">
              ✅ Correct! Well done!
            </div>
          ) : (
            <div className="feedback wrong-feedback">
              ❌ Incorrect. The correct answer is: {question.options[question.correctIndex]}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;