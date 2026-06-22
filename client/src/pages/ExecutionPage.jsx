import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ExecutionPage({ game }) {
  //random event generated for each route segment
  const [routeEvents, setRouteEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load all available events from the server
    fetch('http://localhost:3001/api/events')
      .then(res => res.json())
      .then(events => {

        const badEvents =
          events.filter(
            e => e.effect < 0
          );

        const goodEvents =
          events.filter(
            e => e.effect >= 0
          );

        const generatedEvents = [];
        // Generate one event for each selected segment
        game.route?.forEach((segment, index) => {

          let selectedEvent;
          // Long routes have a higher chance of negative events
          if (index >= 4) {

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

          generatedEvents.push({
            segment,
            event: selectedEvent
          });

        });

        setRouteEvents(generatedEvents);

      });

  }, [game]);

  if (!game) {
    return <p>No game loaded</p>;
  }

  if (routeEvents.length === 0) {
    return <p>Loading events...</p>;
  }
// Sum all event effects
  const totalEffect =
    routeEvents.reduce(
      (sum, item) =>
        sum + item.event.effect,
      0
    );
// Calculate the final score after all events
  const finalCoins =
    game.coins + totalEffect;

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

      <h3>Route Events</h3>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>Segment</th>
            <th>Event</th>
            <th>Effect</th>
          </tr>

        </thead>

        <tbody>

          {routeEvents.map((item, index) => (

            <tr key={index}>

              <td>
                {item.segment.station1}
                {' - '}
                {item.segment.station2}
              </td>

              <td>
                {item.event.description}
              </td>

              <td>
                {item.event.effect}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <hr />

      <h3>Coins</h3>

      <p>
        Initial: {game.coins}
      </p>

      <p>
        Total Event Effect:
        {' '}
        <b>{totalEffect}</b>
      </p>

      <p>
        Final:
        {' '}
        <b>{finalCoins}</b>
      </p>

      <button
        className="btn btn-success mt-3"
        onClick={() => {
          // Save the final score and move to the result page
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