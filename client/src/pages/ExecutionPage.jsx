import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ExecutionPage({ game }) {

  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    fetch('http://localhost:3001/api/events')
      .then(res => res.json())
      .then(events => {

        const routeLength =
          game.route?.length || 0;

        const badEvents =
          events.filter(
            e => e.effect < 0
          );

        const goodEvents =
          events.filter(
            e => e.effect >= 0
          );

        let selectedEvent;

        if (routeLength > 4) {

          const random = Math.random();

          if (random < 0.7) {

            selectedEvent =
              badEvents[
                Math.floor(
                  Math.random() *
                  badEvents.length
                )
              ];

          }
          else {

            selectedEvent =
              goodEvents[
                Math.floor(
                  Math.random() *
                  goodEvents.length
                )
              ];

          }

        }
        else {

          selectedEvent =
            events[
              Math.floor(
                Math.random() *
                events.length
              )
            ];

        }

        setEvent(selectedEvent);

      });

  }, [game]);

  if (!game) {
    return <p>No game loaded</p>;
  }

  if (!event) {
    return <p>Loading event...</p>;
  }

  const finalCoins =
    game.coins + event.effect;

  return (
    <div className="container mt-5">

      <h1>Execution Phase</h1>

      <p>
        Start: <b>{game.start.name}</b>
      </p>

      <p>
        Destination: <b>{game.destination.name}</b>
      </p>

      <hr />

      <h3>Selected Route</h3>

      <ul>

        {game.route?.map(segment => (

          <li key={segment.id}>
            {segment.station1}
            {' - '}
            {segment.station2}
          </li>

        ))}

      </ul>

      <hr />

      <h3>Random Event</h3>

      <p>
        <b>{event.description}</b>
      </p>

      <p>
        Effect: <b>{event.effect}</b>
      </p>

      <hr />

      <h3>Coins</h3>

      <p>
        Initial: {game.coins}
      </p>

      <p>
        Final: <b>{finalCoins}</b>
      </p>

      <button
        className="btn btn-success mt-3"
        onClick={() => {

          const updatedGame = {
            ...game,
            finalCoins
          };

          navigate('/result', {
            state: updatedGame
          });

        }}
      >
        Show Result
      </button>

    </div>
  );
}

export default ExecutionPage;