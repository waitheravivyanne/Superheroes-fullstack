import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PowerDetail() {
  const { id } = useParams();
  const [power, setPower] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5555/powers/${id}`) 
      .then((response) => {
        setPower(response.data);
      })
      .catch((error) => {
        console.error('Error fetching power details:', error);
      });
  }, [id]);

  return (
    <div>
      <h2>Power Details</h2>
      {power ? (
        <div>
          <h3>{power.name}</h3>
          <p>Description: {power.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PowerDetail;
