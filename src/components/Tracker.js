import React from 'react';
import Progress from './Progress';
import FoodLog from './FoodLog';

const Tracker = () => {
  return (
    <div className="tracker">
      <Progress />
      <FoodLog />
    </div>
  );
};

export default Tracker;
