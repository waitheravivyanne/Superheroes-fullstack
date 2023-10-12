import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HeroList from './components/HeroList';
import HeroDetail from './components/HeroDetail';
import PowerList from './components/PowerList';
import PowerDetail from './components/PowerDetail';
import HeroForm from './components/HeroForm';

function App() {
  // Define functions to handle the creation of heroes and powers.
  const handleHeroCreated = (heroData) => {
    // Handle the created hero data as needed.
    console.log('Hero created:', heroData);
  };

  const handlePowerCreated = (powerData) => {
    // Handle the created power data as needed.
    console.log('Power created:', powerData);
  };

  return (
    <Router>
      <div className="container">
        <main>
          <Routes>
            <Route path="/powers/:id" element={<PowerDetail />} />
            <Route path="/heroes/:id" element={<HeroDetail />} />
            <Route
              path="/"
              element={<HeroList />}
              onHeroCreated={handleHeroCreated} // Pass the handler for hero creation
              onPowerCreated={handlePowerCreated} // Pass the handler for power creation
            />
            <Route path="/powers" element={<PowerList />} />
          </Routes>
          <HeroForm
            onHeroCreated={handleHeroCreated} // Pass the handler for hero creation
            onPowerCreated={handlePowerCreated} // Pass the handler for power creation
          />
        </main>
        <footer className="footer">
          &copy; 2023 Superhero World
        </footer>
      </div>
    </Router>
  );
}

export default App;
