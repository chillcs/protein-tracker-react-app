import React from 'react';

const GoalTracker = ({ goal, totalProtein, handleChange }) => {
  const width = (totalProtein / goal) * 100;

  return (
    <div className="progress">
      <div className="goal-input">
        <h2>SET GOAL</h2>
        <input
          type="number"
          id="setGoal"
          value={goal}
          onChange={handleChange}
        />
      </div>
      <div className="progress-bar-goal">
        <div
          className="progress-bar-progress"
          style={{ width: `${width}%` }}
        ></div>
        <p>
          {totalProtein} / {goal} GRAMS
        </p>
      </div>
    </div>
  );
};

export default GoalTracker;
