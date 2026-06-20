import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import metroMap from '../assets/metro-map.png';

function SetupPage({ game, setGame }) {

  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(10);

  useEffect(() => {

    if (!game) {

      fetch('http://localhost:3001/api/game/new')
        .then(res => res.json())
        .then(data => setGame(data));

    }

  }, [game, setGame]);

  useEffect(() => {

    if (!game)
      return;

    if (seconds === 0) {

      navigate('/planning');

      return;
    }

    const timer = setTimeout(() => {

      setSeconds(seconds - 1);

    }, 1000);

    return () => clearTimeout(timer);

  }, [seconds, game, navigate]);

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

      <h4>
        Memorize the map!
      </h4>

      <h2>
        {seconds}
      </h2>

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