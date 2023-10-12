import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HeroList from './components/HeroList';
import HeroDetail from './components/HeroDetail';
import PowerList from './components/PowerList';
import PowerDetail from './components/PowerDetail';
import HeroForm from './components/HeroForm';

function App() {
  const handleHeroCreated = (heroData) => {
    console.log('Hero created:', heroData);
  };

  const handlePowerCreated = (powerData) => {
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
              onHeroCreated={handleHeroCreated} 
              onPowerCreated={handlePowerCreated} 
            />
            <Route path="/powers" element={<PowerList />} />
          </Routes>
          <HeroForm
            onHeroCreated={handleHeroCreated} 
            onPowerCreated={handlePowerCreated}
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
