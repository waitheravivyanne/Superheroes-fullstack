// HeroCard.js
import React from 'react';
import './HeroCard.css';

function HeroCard({ hero }) {
  const imageUrl = isValidUrl(hero.image) ? hero.image : 'placeholder-image-url.jpg';
  console.log('Hero Image URL:', hero.image);

  return (
    <div className="hero-card">
      {imageUrl ? (
        <img src={imageUrl} alt={hero.super_name} />
      ) : (
        <div className="placeholder-image">Placeholder Image</div>
      )}
      <h3>{hero.super_name}</h3>
      <p>Name: {hero.name}</p>
      <h4>Powers:</h4>
      <ul>
        {hero.powers && hero.powers.map((power) => (
          <li key={power.id}>{power.name}</li>
        ))}
      </ul>
    </div>
  );
}


function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
}

export default HeroCard;
