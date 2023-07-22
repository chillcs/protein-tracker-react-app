import React from 'react';

const FoodLog = ({ loggedFood, handleDeleteFood }) => {
  return (
    <div className="food-log">
      <div className="section-title">
        <h2>FOOD LOG</h2>
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
              <h3>Log</h3>
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
        {loggedFood.map((item, index) => (
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
                <p>
                  {item.quantity} {item.foodName}
                </p>
              </div>
              <div className="cell cell-grams-of-protein">
                <p>{item.quantity * item.gramsOfProtein} g</p>
              </div>
              <div className="cell cell-calories">
                <p>{item.quantity * item.calories} cals</p>
              </div>
              <div className="cell cell-delete">
                <button
                  className="delete-food-button"
                  onClick={() => handleDeleteFood(index)}
                >
                  <p>✕</p>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodLog;
