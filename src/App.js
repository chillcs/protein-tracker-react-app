import React, { useState } from 'react';
import Tracker from './components/Tracker';
import Library from './components/Library';

function App() {
  const [active, setActive] = useState(0);

  function openTab(event) {
    const target = parseInt(event.currentTarget.id);
    setActive(target);
  }

  return (
    <div className="app">
      <div className="header">
        <div className="logo">
          <h1>PROTEIN</h1>
        </div>
      </div>
      <div className="main">
        {active === 0 && <Tracker />}
        {active === 1 && <Library />}
      </div>
      <div className="tabs">
        <button
          className={active === 0 ? 'tab tab-active' : 'tab'}
          id={0}
          onClick={openTab}
        >
          LOG
        </button>
        <button
          className={active === 1 ? 'tab tab-active' : 'tab'}
          id={1}
          onClick={openTab}
        >
          FOOD
        </button>
      </div>
    </div>
  );
}

export default App;
