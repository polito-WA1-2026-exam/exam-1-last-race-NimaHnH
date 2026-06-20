import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import metroMap from '../assets/metro-map.png';

function SetupPage({ game, setGame }) {

  const navigate = useNavigate();

 

  useEffect(() => {

    if (!game) {

      fetch('http://localhost:3001/api/game/new')
        .then(res => res.json())
        .then(data => setGame(data));

    }

  }, [game, setGame]);


  if (!game)
    return <p>Loading...</p>;

  return (
    <div className="container mt-5">

      <h1>Last Race</h1>

      <h3>New Game</h3>

      <p>
        Start Station: <b>{game.start.name}</b>
      </p>

      <p>
        Destination: <b>{game.destination.name}</b>
      </p>

      <p>
        Coins: <b>{game.coins}</b>
      </p>
<hr />

<hr />

<h4>Metro Map</h4>
<img
  src={metroMap}
  alt="Metro Map"
  className="img-fluid"
  style={{
    maxWidth: '600px'
  }}
/>


<hr />

      <button
        className="btn btn-success"
        onClick={() => navigate('/planning')}
      >
        Start Game Now
      </button>

    </div>
  );
}

export default SetupPage;