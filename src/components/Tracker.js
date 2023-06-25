import React, { useState, useEffect } from 'react';

const Tracker = () => {
  const [goal, setGoal] = useState('');

  useEffect(() => {
    const storedGoal = localStorage.getItem('storedGoal');
    if (storedGoal) {
      setGoal(storedGoal);
    }
  }, []);

  const handleChange = (event) => {
    const inputGoal = event.target.value;
    setGoal(inputGoal);
  };

  useEffect(() => {
    localStorage.setItem('storedGoal', goal);
  }, [goal]);
  return (
    <div className="tracker">
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
          <div className="progress-bar-progress"></div>
          <p>0 / {goal} GRAMS</p>
        </div>
      </div>
      <div className="food-log">
        <h2>FOOD LOG</h2>
      </div>
    </div>
  );
};

export default Tracker;
