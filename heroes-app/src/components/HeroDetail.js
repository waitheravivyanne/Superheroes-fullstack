import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 

function HeroDetail() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    axios.get(`http://localhost:5555/heroes/${id}`)
      .then((response) => {
        setHero(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        setError(error); 
        setLoading(false); 
      });
  }, [id]);

  return (
    <div>
      <h2>Hero Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching hero details: {error.message}</p>
      ) : hero ? (
        <div>
          <h3>{hero.super_name}</h3>
          <p>Name: {hero.name}</p>
          <h4>Powers:</h4>
          <ul>
            {hero.powers.map((power) => (
              <li key={power.id}>{power.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hero found.</p>
      )}
    </div>
  );
}

export default HeroDetail;
