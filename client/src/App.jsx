import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InstructionsPage from './pages/InstructionsPage';
import LoginPage from './pages/LoginPage';
import SetupPage from './pages/SetupPage';
import PlanningPage from './pages/PlanningPage';
import ExecutionPage from './pages/ExecutionPage';
import ResultPage from './pages/ResultPage';
import RankingPage from './pages/RankingPage';

function App() {
  // Save game info
  const [game, setGame] = useState(null);
  // Save logged-in user
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>

      <Routes>

        <Route
  path="/"
  element={<InstructionsPage />}
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
    user
      ? (
        <SetupPage
          game={game}
          setGame={setGame}
        />
      )
      : <Navigate to="/" />
  }
/>

<Route
  path="/planning"
  element={
    user
      ? (
        <PlanningPage
          game={game}
          setGame={setGame}
        />
      )
      : <Navigate to="/" />
  }
/>

<Route
  path="/execution"
  element={
    user
      ? (
        <ExecutionPage
          game={game}
        />
      )
      : <Navigate to="/" />
  }
/>

<Route
  path="/result"
  element={
    user
      ? (
        <ResultPage
          user={user}
        />
      )
      : <Navigate to="/" />
  }
/>

<Route
  path="/ranking"
  element={
    user
      ? <RankingPage />
      : <Navigate to="/" />
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;