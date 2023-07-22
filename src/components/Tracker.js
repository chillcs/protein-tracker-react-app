import React, { useState, useEffect } from 'react';
import FoodLog from './FoodLog';
import GoalTracker from './GoalTracker';

const Tracker = () => {
  const [goal, setGoal] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loggedFood, setLoggedFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const storedGoal = localStorage.getItem('storedGoal');
    if (storedGoal) {
      setGoal(storedGoal);
    }

    const storedFoodItems = localStorage.getItem('foodItems');
    if (storedFoodItems) {
      setFoodItems(JSON.parse(storedFoodItems));
    }
  }, []);

  useEffect(() => {
    const proteinSum = loggedFood.reduce(
      (sum, item) => sum + item.quantity * item.gramsOfProtein,
      0
    );
    setTotalProtein(proteinSum);

    localStorage.setItem('loggedFood', JSON.stringify(loggedFood));
  }, [loggedFood]);

  useEffect(() => {
    const caloriesSum = loggedFood.reduce(
      (sum, item) => sum + item.quantity * item.calories,
      0
    );
    setTotalCalories(caloriesSum);

    localStorage.setItem('loggedFood', JSON.stringify(loggedFood));
  }, [loggedFood]);

  const handleChange = (event) => {
    const inputGoal = event.target.value;
    setGoal(inputGoal);
  };

  useEffect(() => {
    localStorage.setItem('storedGoal', goal);
  }, [goal]);

  const handleDropdownToggle = () => {
    if (isDropdownOpen) {
      setSelectedFood('');
      setQuantity('');
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddFood = () => {
    if (!selectedFood || !quantity) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (selectedFood && quantity) {
      const foodItem = foodItems.find((item) => item.foodName === selectedFood);
      const newLoggedFood = {
        foodName: selectedFood,
        gramsOfProtein: foodItem.gramsOfProtein,
        calories: foodItem.calories,
        quantity: parseInt(quantity),
      };
      const updatedLoggedFood = [...loggedFood, newLoggedFood];
      setLoggedFood(updatedLoggedFood);
      setSelectedFood('');
      setQuantity('');
      handleFormToggle();

      localStorage.setItem('loggedFood', JSON.stringify(updatedLoggedFood));
    }
  };

  const handleFormToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteFood = (index) => {
    const updatedLoggedFood = loggedFood.filter((_, i) => i !== index);
    setLoggedFood(updatedLoggedFood);
  };

  return (
    <div className="tracker">
      <GoalTracker
        goal={goal}
        totalProtein={totalProtein}
        handleChange={handleChange}
      />
      <div className="calories">
        <p>Total Calories: {totalCalories} cals</p>
      </div>
      <FoodLog
        loggedFood={loggedFood}
        handleDeleteFood={handleDeleteFood}
      />
      {loggedFood.length === 0 && (
        <p className="empty-table-error-message">
          No items have been added yet.
        </p>
      )}
      <div className="btn-container">
        <button
          className="new-log-btn"
          onClick={handleDropdownToggle}
        >
          <h2 className="button-title">
            {isDropdownOpen ? 'NEW LOG －' : 'NEW LOG ＋'}
          </h2>
        </button>
        {isDropdownOpen && (
          <div className="form-group">
            <select
              className="input-food-dropdown"
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
              style={{
                fontSize: '12px',
                fontWeight: '200',
                color: '#9A9A9A',
              }}
            >
              <option value="">Select Food</option>
              {foodItems.map((item, index) => (
                <option
                  key={index}
                  value={item.foodName}
                >
                  {item.foodName}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="quantity-input"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button
              className="input-submit"
              onClick={handleAddFood}
            >
              <p>Add Food</p>
            </button>
            <div className="form-error-message">
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;
