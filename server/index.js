import express from "express";
import cors from "cors";
import db from "./db/db.js";
import {
  getAllStations,
  getAllSegments,
  getRandomStations,
  getSegmentsWithNames,
  getAllEvents
} from './db/queries.js';
import session from 'express-session';
import passport from './passport.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: 'last-race-secret',
    resave: false,
    saveUninitialized: false
  })
);

app.post(
  '/api/sessions',
  passport.authenticate('local'),
  (req, res) => {

    res.json(req.user);

  }
);

app.get('/api/sessions/current', (req, res) => {

  if (req.isAuthenticated()) {
    return res.json(req.user);
  }

  res.status(401).json({
    error: 'Not authenticated'
  });

});


app.delete('/api/sessions/current', (req, res) => {

  req.logout(() => {
    res.json({ message: 'logout' });
  });

});

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/network', async (req, res) => {

  try {

    const stations = await getAllStations();

    res.json(stations);

  } catch (err) {

    res.status(500).json(err);

  }

});

app.get('/api/segments', async (req, res) => {

  try {

    const segments =
      await getSegmentsWithNames();

    res.json(segments);

  } catch (err) {

    res.status(500).json(err);

  }

});

app.get('/api/events', async (req, res) => {

  try {

    const events = await getAllEvents();

    res.json(events);

  } catch (err) {

    res.status(500).json(err);

  }

});

app.get('/api/game/new', async (req, res) => {

  try {

    const stations = await getRandomStations();

    const validPairs = [

      ['Porta Nuova', 'Dante'],
      ['Porta Nuova', 'Massaua'],
      ['Porta Nuova', 'Lingotto'],

      ['Re Umberto', 'Dante'],
      ['Re Umberto', 'Lingotto'],

      ['Porta Susa', 'Massaua'],
      ['Porta Susa', 'Lingotto'],

      ['Bernini', 'Massaua'],

      ['Dante', 'Lingotto']

    ];

    const pair =
      validPairs[
        Math.floor(
          Math.random() * validPairs.length
        )
      ];

    const start =
      stations.find(
        s => s.name === pair[0]
      );

    const destination =
      stations.find(
        s => s.name === pair[1]
      );

    res.json({
      start,
      destination,
      coins: 20
    });

  } catch (err) {

    res.status(500).json(err);

  }

});

app.get('/api/event/random', async (req, res) => {

  try {

    const events = await getAllEvents();

    const random =
      events[Math.floor(Math.random() * events.length)];

    res.json(random);

  } catch (err) {

    res.status(500).json(err);

  }

});

app.post('/api/results', (req, res) => {

  const {
    username,
    score
  } = req.body;

  db.get(
    `
    SELECT score
    FROM games
    WHERE username = ?
    `,
    [username],
    (err, row) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (row) {

        if (score > row.score) {

          db.run(
            `
            UPDATE games
            SET score = ?
            WHERE username = ?
            `,
            [score, username],
            (err) => {

              if (err) {
                return res.status(500).json(err);
              }

              res.json({
                message: 'updated'
              });

            }
          );

        }
        else {

          res.json({
            message: 'score not improved'
          });

        }

      }
      else {

        db.run(
          `
          INSERT INTO games(
            username,
            score
          )
          VALUES(?,?)
          `,
          [username, score],
          (err) => {

            if (err) {
              return res.status(500).json(err);
            }

            res.json({
              message: 'saved'
            });

          }
        );

      }

    }
  );

});

app.get('/api/ranking', (req, res) => {

  db.all(
    `
SELECT username, score
FROM games
ORDER BY score DESC
    `,
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


