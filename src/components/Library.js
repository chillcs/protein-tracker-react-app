import React, { useState, useEffect } from 'react';

const Library = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [gramsOfProtein, setGramsOfProtein] = useState('');
  const [calories, setCalories] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Retrieve stored food items from local storage
    const storedItems = localStorage.getItem('foodItems');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      const sortedItems = parsedItems.sort((a, b) =>
        a.foodName.localeCompare(b.foodName)
      );
      setFoodItems(sortedItems);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!foodName || !gramsOfProtein || !calories) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const newFoodItem = {
      foodName,
      gramsOfProtein: parseFloat(gramsOfProtein),
      calories: parseFloat(calories),
    };

    // Store newFoodItem in local storage
    const updatedItems = [...foodItems, newFoodItem];
    const sortedItems = updatedItems.sort((a, b) =>
      a.foodName.localeCompare(b.foodName)
    );
    localStorage.setItem('foodItems', JSON.stringify(sortedItems));

    // Update the foodItems state and clear the form fields
    setFoodItems(sortedItems);
    setFoodName('');
    setGramsOfProtein('');
    setCalories('');
    setErrorMessage('');

    // Toggle form
    handleFormToggle();
  };

  const handleFormToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = (index) => {
    const updatedItems = foodItems.filter((_, i) => i !== index);
    localStorage.setItem('foodItems', JSON.stringify(updatedItems));
    setFoodItems(updatedItems);
  };

  return (
    <div className="library">
      <div className="saved-foods">
        <div className="section-title">
          <h2>MY FOODS</h2>
        </div>
        <ul className="table">
          <li>
            <div
              className="row title-row"
              style={{
                backgroundColor: 'var(--colorPrimary)',
              }}
            >
              <div className="cell cell-food-name">
                <h3>Name</h3>
              </div>
              <div className="cell cell-grams-of-protein">
                <h3>Protein</h3>
              </div>
              <div className="cell cell-calories">
                <h3>Calories</h3>
              </div>
              <div className="cell cell-delete"></div>
            </div>
          </li>
          {foodItems.map((item, index) => (
            <li key={index}>
              <div
                className="row"
                style={{
                  backgroundColor:
                    index % 2 === 1
                      ? 'var(--colorPrimary)'
                      : 'var(--colorPrimaryAlternate)',
                }}
              >
                <div className="cell cell-food-name">
                  <p>{item.foodName}</p>
                </div>
                <div className="cell cell-grams-of-protein">
                  <p>{item.gramsOfProtein} g</p>
                </div>
                <div className="cell cell-calories">
                  <p>{item.calories} cals</p>
                </div>
                <div className="cell cell-delete">
                  <button onClick={() => handleDelete(index)}>
                    <p>✕</p>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {foodItems.length === 0 && (
        <p className="empty-table-error-message">
          No items have been added yet.
        </p>
      )}
      <div className="btn-container">
        <button
          className="add-food-btn"
          onClick={handleFormToggle}
        >
          <h2 className="button-title">
            {isOpen ? 'ADD FOOD －' : 'ADD FOOD ＋'}
          </h2>
        </button>
        {isOpen && (
          <form
            className="add-food-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                className="input-food-name"
                type="text"
                placeholder="Food Name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
              <input
                className="input-grams-of-protein"
                type="number"
                placeholder="Grams of Protein"
                value={gramsOfProtein}
                onChange={(e) => setGramsOfProtein(e.target.value)}
              />
              <input
                className="input-calories"
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
              <button
                className="input-submit"
                type="submit"
              >
                <p>Submit</p>
              </button>
            </div>
            <div className="form-error-message">
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Library;
