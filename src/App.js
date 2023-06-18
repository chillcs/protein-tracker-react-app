import React, { useState } from 'react';
import Tracker from './components/Tracker';
import Library from './components/Library';

function App() {
  const [active, setActive] = useState(0);
  function openTab(event) {
    const target = event.currentTarget.id;
    setActive(target);
  }

  return (
    <div className="app">
      <div className="header">
        <div className="logo">PROTEIN</div>
      </div>
      <div className="main">
        {parseInt(active) === 0 && <Tracker />}
        {parseInt(active) === 1 && <Library />}
      </div>
      <div className="tabs">
        <button
          className="tab"
          id={0}
          onClick={openTab}
        >
          TRACKER
        </button>
        <button
          className="tab"
          id={1}
          onClick={openTab}
        >
          LIBRARY
        </button>
      </div>
    </div>
  );
}

export default App;
