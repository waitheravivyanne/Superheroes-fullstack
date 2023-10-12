import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PowerList() {
  const [powers, setPowers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5555/powers`)
      .then((response) => {
        setPowers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching powers:', error);
      });
  }, []);

  const handleDeletePower = (powerId) => {
    // Send a DELETE request to delete the power
    axios.delete(`http://localhost:5555/powers/${powerId}`)
      .then(() => {
        // Power deleted successfully, update the UI by filtering out the deleted power
        setPowers(powers.filter((power) => power.id !== powerId));
      })
      .catch((error) => {
        console.error('Error deleting power:', error);
      });
  };

  return (
    <div>
      <h2>Power List</h2>
      <ul>
        {powers.map((power) => (
          <li key={power.id}>
            <a href={`/powers/${power.id}`}>{power.name}</a>
            <button onClick={() => handleDeletePower(power.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PowerList;
