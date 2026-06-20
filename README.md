# Exam 2026: Last Race

## Student: s359242 Hosseini Nima

## React Client Application Routes

* Route `/`

  * Login page.
  * Users authenticate using Passport.js with seeded credentials.

* Route `/setup`

  * Displays the generated game.
  * Shows start station, destination station, available coins, and the metro map.
  * Includes a countdown timer for map memorization.

* Route `/planning`

  * Route planning phase.
  * Displays all available segments.
  * Users select the segments that form their route.
  * Includes a 90-second timer.

* Route `/execution`

  * Simulates the journey.
  * Random events affect the player's score.
  * Event probabilities change as the journey progresses.

* Route `/result`

  * Displays the final score.
  * Allows the user to save the result.

* Route `/ranking`

  * Displays the ranking of all users ordered by score.

---

## API Server

### POST `/api/sessions`

* Request Body:

```json
{
  "username": "nima",
  "password": "1234"
}
```

* Response:

```json
{
  "username": "nima"
}
```

### GET `/api/sessions/current`

* Returns the currently authenticated user.

### DELETE `/api/sessions/current`

* Logs out the current user.

### GET `/api/network`

* Returns all metro stations.

### GET `/api/segments`

* Returns all available segments between stations.

### GET `/api/events`

* Returns all possible game events.

### GET `/api/game/new`

* Creates a new game.
* Returns:

  * start station
  * destination station
  * initial coins

### GET `/api/event/random`

* Returns a randomly selected event.

### POST `/api/results`

* Request Body:

```json
{
  "username": "nima",
  "score": 24
}
```

* Saves or updates the user's best score.

### GET `/api/ranking`

* Returns all ranking entries ordered by score.

---

## Database Tables

### Table `users`

Contains:

* id
* username
* password

### Table `stations`

Contains:

* id
* name

### Table `lines`

Contains:

* id
* name

### Table `segments`

Contains:

* id
* station1
* station2
* lineId

### Table `events`

Contains:

* id
* description
* effect

### Table `games`

Contains:

* id
* username
* score

---

## Main React Components

### `LoginPage`

Handles user authentication and displays demo credentials.

### `SetupPage`

Displays the metro map, start station, destination station, and memorization timer.

### `PlanningPage`

Allows users to select route segments and validates route connectivity.

### `ExecutionPage`

Executes the journey simulation and applies random events.

### `ResultPage`

Displays the final score and allows saving results.

### `RankingPage`

Displays the ranking table.

### `App`

Main application component handling routing and global state.

---

## Screenshot

![Screenshot](./img/screenshot.jpg)

---

## Users Credentials

| Username | Password |
| -------- | -------- |
| nima     | 1234     |
| mario    | 1234     |
| luca     | 1234     |

---

## Use of AI Tools

ChatGPT was used during development for:

* Clarifying React and Express concepts.
* Debugging authentication and routing issues.
* Reviewing code structure.
* Improving documentation.
* Assisting with implementation details.

All generated suggestions were reviewed, tested, and adapted before being integrated into the final project.
