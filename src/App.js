import Header from './components/Header';
import Tracker from './components/Tracker';
import Library from './components/Library';
import Tabs from './components/Tabs';

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <div className="main">
          <Tracker />
          <Library />
        </div>
        <Tabs />
      </div>
    </>
  );
}

export default App;
