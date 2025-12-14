import React from 'react';

const HintBox = ({ hint }) => {
  return (
    <div className="hint-box">
      <div className="hint-header">
        <span className="hint-icon">💡</span>
        <span className="hint-title">Grammar Hint</span>
      </div>
      <div className="hint-content">
        {hint}
      </div>
    </div>
  );
};

export default HintBox;