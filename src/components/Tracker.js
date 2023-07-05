import React, { useState, useEffect } from 'react';

const Tracker = () => {
  const [goal, setGoal] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loggedFood, setLoggedFood] = useState([]);

  useEffect(() => {
    const storedGoal = localStorage.getItem('storedGoal');
    if (storedGoal) {
      setGoal(storedGoal);
    }

    const storedFoodItems = localStorage.getItem('foodItems');
    if (storedFoodItems) {
      setFoodItems(JSON.parse(storedFoodItems));
    }

    const storedLoggedFood = localStorage.getItem('loggedFood');
    if (storedLoggedFood) {
      setLoggedFood(JSON.parse(storedLoggedFood));
    }
  }, []);

  const handleChange = (event) => {
    const inputGoal = event.target.value;
    setGoal(inputGoal);
  };

  useEffect(() => {
    localStorage.setItem('storedGoal', goal);
  }, [goal]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddFood = (foodItem, quantity) => {
    const updatedLoggedFood = [...loggedFood, { ...foodItem, quantity }];
    setLoggedFood(updatedLoggedFood);
    localStorage.setItem('loggedFood', JSON.stringify(updatedLoggedFood));
  };

  const handleDeleteFood = (index) => {
    const updatedLoggedFood = loggedFood.filter((_, i) => i !== index);
    setLoggedFood(updatedLoggedFood);
    localStorage.setItem('loggedFood', JSON.stringify(updatedLoggedFood));
  };

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
        <button
          className="log-food-button"
          onClick={handleDropdownToggle}
        >
          Log Food
        </button>
        {isDropdownOpen && (
          <ul className="food-dropdown">
            {foodItems.map((item, index) => (
              <li key={index}>
                <p>{item.foodName}</p>
                <p>{item.gramsOfProtein} g</p>
                <p>{item.calories} cals</p>
                <button
                  className="add-food-button"
                  onClick={() => {
                    const quantity = parseInt(prompt('Enter quantity', '1'));
                    if (!isNaN(quantity)) {
                      handleAddFood(item, quantity);
                    }
                  }}
                >
                  Add Food
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="logged-food">
        <h2>Logged Food</h2>
        <ul>
          {loggedFood.map((item, index) => (
            <li key={index}>
              <p>{item.foodName}</p>
              <p>{item.gramsOfProtein} g</p>
              <p>{item.calories} cals</p>
              <p>Quantity: {item.quantity}</p>
              <button
                className="delete-food-button"
                onClick={() => handleDeleteFood(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tracker;
