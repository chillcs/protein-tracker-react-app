import React, { useState, useEffect } from 'react';

const Library = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [gramsOfProtein, setGramsOfProtein] = useState('');
  const [measurement, setMeasurement] = useState('');
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

    if (!foodName || !measurement || !gramsOfProtein) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const newFoodItem = {
      foodName,
      measurement,
      gramsOfProtein: parseFloat(gramsOfProtein),
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
    setMeasurement('');
    setErrorMessage('');
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
          <h2>SAVED FOODS</h2>
        </div>
        <ul className="table">
          <li>
            <div
              className="row title-row"
              style={{
                backgroundColor: 'var(--colorSecondary)',
              }}
            >
              <div className="cell cell-food-name">
                <h3>Name</h3>
              </div>
              <div className="cell cell-grams-of-protein">
                <h3>Amount</h3>
              </div>
              <div className="cell cell-measurement">
                <h3>Unit</h3>
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
                    index % 2 === 1 ? 'inherit' : 'var(--colorPrimary)',
                }}
              >
                <div className="cell cell-food-name">
                  <p>{item.foodName}</p>
                </div>
                <div className="cell cell-grams-of-protein">
                  <p>{item.gramsOfProtein}g</p>
                </div>
                <div className="cell cell-measurement">
                  <p>{item.measurement}</p>
                </div>
                <div className="cell cell-delete">
                  <button onClick={() => handleDelete(index)}>
                    <p>Delete</p>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-food">
        <button
          className="add-food-btn"
          onClick={handleFormToggle}
        >
          <h2 className="section-title">
            {isOpen ? 'HIDE FORM －' : 'ADD FOOD ＋'}
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
                placeholder="Name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
              <input
                className="input-grams-of-protein"
                type="number"
                placeholder="Amount"
                value={gramsOfProtein}
                onChange={(e) => setGramsOfProtein(e.target.value)}
              />
              <input
                className="input-measurement"
                type="text"
                placeholder="Unit"
                value={measurement}
                onChange={(e) => setMeasurement(e.target.value)}
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
