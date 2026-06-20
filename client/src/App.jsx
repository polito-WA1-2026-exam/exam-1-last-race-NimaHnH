import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SetupPage from './pages/SetupPage';
import PlanningPage from './pages/PlanningPage';
import ExecutionPage from './pages/ExecutionPage';
import ResultPage from './pages/ResultPage';
import RankingPage from './pages/RankingPage';

function App() {

  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
  path="/login"
  element={
    <LoginPage
      setUser={setUser}
    />
  }
/>

        <Route
          path="/setup"
          element={
            <SetupPage
              game={game}
              setGame={setGame}
            />
          }
        />

<Route
  path="/planning"
  element={
    <PlanningPage
      game={game}
      setGame={setGame}
    />
  }
/>

        <Route
  path="/execution"
  element={
    <ExecutionPage
      game={game}
    />
  }
/>

<Route
  path="/result"
  element={
<ResultPage user={user} />
  }
/>

        <Route
          path="/ranking"
          element={<RankingPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;