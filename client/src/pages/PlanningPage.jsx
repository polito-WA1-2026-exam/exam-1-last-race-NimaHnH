import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PlanningPage({ game, setGame }) {

  const navigate = useNavigate();

  const [segments, setSegments] = useState([]);
  const [selected, setSelected] = useState([]);
  const [timeLeft, setTimeLeft] = useState(90);

  useEffect(() => {

    fetch('http://localhost:3001/api/segments')
      .then(res => res.json())
      .then(data => setSegments(data));

  }, []);

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft(prev => {

        if (prev <= 1) {

          clearInterval(timer);

          const updatedGame = {
            ...game,
            route: [],
            finalCoins: 0
          };

          navigate('/result', {
            state: updatedGame
          });

          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [game, navigate]);

  if (!game) {
    return <p>No game loaded</p>;
  }

  const toggleSegment = (segment) => {

    const exists =
      selected.find(s => s.id === segment.id);

    if (exists) {

      setSelected(
        selected.filter(s => s.id !== segment.id)
      );

    }
    else {

      setSelected([
        ...selected,
        segment
      ]);

    }

  };

  function isConnectedRoute(
    route,
    startStation,
    destinationStation
  ) {

    let current = startStation;

    const visited = [];

    while (current !== destinationStation) {

      const nextSegment =
        route.find(
          s =>
            s.station1 === current &&
            !visited.includes(s.id)
        );

      if (!nextSegment)
        return false;

      visited.push(nextSegment.id);

      current = nextSegment.station2;
    }

    return true;
  }

  return (
    <div className="container mt-5">

      <h1>Planning Phase</h1>

      <p>
        Start: <b>{game.start.name}</b>
      </p>

      <p>
        Destination: <b>{game.destination.name}</b>
      </p>

      <p>
        Coins: <b>{game.coins}</b>
      </p>

      <h3 className="text-danger">
        Time Remaining: {timeLeft}s
      </h3>

      <hr />

      <p>Available Segments</p>

      <ul>

        {segments.map(segment => (

          <li key={segment.id}>

            <input
              type="checkbox"
              onChange={() => toggleSegment(segment)}
            />

            {' '}

            {segment.station1}
            {' - '}
            {segment.station2}

          </li>

        ))}

      </ul>

      <button
        className="btn btn-primary mt-3"
        onClick={() => {

          if (
            !isConnectedRoute(
              selected,
              game.start.name,
              game.destination.name
            )
          ) {

            const updatedGame = {
              ...game,
              route: selected,
              finalCoins: 0
            };

            navigate('/result', {
              state: updatedGame
            });

            return;
          }

          setGame({
            ...game,
            route: selected
          });

          navigate('/execution');

        }}
      >
        Continue
      </button>

    </div>
  );
}

export default PlanningPage;