import { useLocation, useNavigate } from 'react-router-dom';
// Displays the final result of the game
function ResultPage({ user }) {

  const location = useLocation();
  const navigate = useNavigate();
// Get game data passed from the previous page
  const game = location.state;

  if (!game) {
    return <p>No result available</p>;
  }
// Negative scores are stored and shown as zero
  const finalScore =
    Math.max(0, game.finalCoins);
// Save the final score in the database
  const saveResult = async () => {
// Send score information to the server
    const response = await fetch(
      'http://localhost:3001/api/results',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user?.username,
          score: finalScore
        })
      }
    );

    if (response.ok) {
      alert('Result saved');
    }

  };

  if (finalScore === 0) {

    return (

      <div className="container mt-5">

        <h1>Game Over</h1>

        <h3 className="text-danger">
          Disconnected or Time Expired
        </h3>

        <p>
          Start: <b>{game.start.name}</b>
        </p>

        <p>
          Destination: <b>{game.destination.name}</b>
        </p>

        <p>
          Score: <b>0</b>
        </p>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/ranking')}
        >
          Ranking
        </button>

      </div>

    );

  }

  return (
    <div className="container mt-5">

      <h1>Game Result</h1>

      <p>
        Start: <b>{game.start.name}</b>
      </p>

      <p>
        Destination: <b>{game.destination.name}</b>
      </p>

      <p>
        Final Coins: <b>{finalScore}</b>
      </p>

      <button
        className="btn btn-success mt-3"
        onClick={saveResult}
      >
        Save Result
      </button>

      <button
        className="btn btn-primary mt-3 ms-2"
        onClick={() => navigate('/ranking')}
      >
        Ranking
      </button>

    </div>
  );
}

export default ResultPage;