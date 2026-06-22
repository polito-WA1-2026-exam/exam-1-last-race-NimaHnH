import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setUser }) {

  const navigate = useNavigate();
  //form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Send login request to the server
  const handleLogin = async (event) => {

    event.preventDefault();
    // Create a new authenticated session
    const response = await fetch(
      'http://localhost:3001/api/sessions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    );

    if (response.ok) {

      const user = await response.json();
      // Save logged-in user information
      setUser(user);
      // Move to the game setup page
      navigate('/setup');

    }
    else {

      alert('Wrong credentials');

    }

  };

  return (
    <div className="container mt-5">

      <h1>Last Race</h1>

      <form onSubmit={handleLogin}>

        <div className="mb-3">

          <label className="form-label">
            Username
          </label>

          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>

      </form>
<hr />

<div className="alert alert-info mt-3">

  <h5>Demo Accounts</h5>

  <p>
    Username: <b>nima</b> | Password: <b>1234</b>
  </p>

  <p>
    Username: <b>mario</b> | Password: <b>1234</b>
  </p>

  <p>
    Username: <b>luca</b> | Password: <b>1234</b>
  </p>

</div>
    </div>
  );
}

export default LoginPage;