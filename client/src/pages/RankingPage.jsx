import { useEffect, useState } from 'react';

// Displays the best scores of all players
function RankingPage() {
//Ranking data received from the server
  const [scores, setScores] = useState([]);

  useEffect(() => {
// Load ranking information
    fetch('http://localhost:3001/api/ranking')
      .then(res => res.json())
      .then(data => setScores(data));

  }, []);

  return (
    <div className="container mt-5">

      <h1>Ranking</h1>

      <table className="table">

        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>

          {scores.map((score, index) => (

            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.score}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RankingPage;