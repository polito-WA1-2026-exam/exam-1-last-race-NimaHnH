import { Link } from 'react-router-dom';

function InstructionsPage() {
  return (
    <div className="container mt-5">

      <div className="text-center mb-5">
        <h1 className="display-2 fw-bold">
          🚇 Last Race
        </h1>

        <p className="lead text-secondary">
          Turin Metro Challenge
        </p>
      </div>

      <div className="card shadow-lg p-4">

        <h2 className="mb-4">
          Game Instructions
        </h2>

        <div className="row">

          <div className="col-md-6">

            <div className="border rounded p-3 mb-3">
              <h5>🎯 Goal</h5>

              <p>
                Reach the destination station by
                selecting a valid route through
                the metro network.
              </p>
            </div>

            <div className="border rounded p-3 mb-3">
              <h5>💰 Coins</h5>

              <p>
                Every player starts with
                <strong> 20 coins</strong>.
              </p>
            </div>

          </div>

          <div className="col-md-6">

            <div className="border rounded p-3 mb-3">
              <h5>🎲 Random Events</h5>

              <p>
                Events may increase or decrease
                your score during the trip.
              </p>
            </div>

            <div className="border rounded p-3 mb-3">
              <h5>⏱ Time Limit</h5>

              <p>
                You have
                <strong> 90 seconds </strong>
                to plan your route.
              </p>
            </div>

          </div>

        </div>

        <div className="alert alert-warning mt-3">

          <h5>⚠ Important</h5>

          <ul className="mb-0">
            <li>
              Start and destination stations are
              at least 3 segments apart.
            </li>

            <li>
              Invalid routes result in a score of 0.
            </li>

            <li>
              Negative scores are stored as 0.
            </li>

            <li>
              The best scores appear in the ranking.
            </li>
          </ul>

        </div>

        <div className="text-center mt-4">

          <Link
            to="/login"
            className="btn btn-primary btn-lg px-5"
          >
            Start Game
          </Link>

        </div>

      </div>

    </div>
  );
}

export default InstructionsPage;