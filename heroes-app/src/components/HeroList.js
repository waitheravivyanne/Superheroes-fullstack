import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HeroList() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get('http://localhost:5555/heroes')
      .then((response) => {
        if (isMounted) { 
        setHeroes(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching heroes:', error);
      });
      return () => {
        isMounted = false;
      };
  }, []);

  const handleDeleteHero = (heroId) => {
    axios.delete(`http://localhost:5555/heroes/${heroId}`)
      .then(() => {
        setHeroes(heroes.filter((hero) => hero.id !== heroId));
      })
      .catch((error) => {
        console.error('Error deleting hero:', error);
      });
  };

  return (
    <div className="container">
      <h2>Hero List</h2>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>
            <a href={`/heroes/${hero.id}`}>{hero.super_name}</a>
            <p>Name: {hero.name}</p>
            <button onClick={() => handleDeleteHero(hero.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeroList;
