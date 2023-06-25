import React from 'react';
import SavedFoods from './SavedFoods';
import NewFood from './NewFood';

const Library = () => {
  return (
    <div className="library">
      <SavedFoods />
      <NewFood />
    </div>
  );
};

export default Library;
