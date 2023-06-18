import React from 'react';
import { useState, useEffect } from 'react';

const ProgressBar = () => {
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
    <>
      <div className="goal-input">
        <input
          type="number"
          id="setGoal"
          value={goal}
          onChange={handleChange}
        />
      </div>
      <div className="progress-bar">
        <div className="progress"></div>
        <p>0 / {goal} GRAMS</p>
      </div>
    </>
  );
};

export default ProgressBar;
