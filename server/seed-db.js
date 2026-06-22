import db from './db/db.js';
import bcrypt from 'bcrypt';
// Populate the database with initial data

// Execute database operations sequentially
db.serialize(() => {

  // stations
  const stations = [
    'Porta Nuova',
    'Porta Susa',
    'Politecnico',
    'Lingotto',
    'Dante',
    'Bernini',
    'Massaua',
    'Rivoli',
    'Re Umberto',
    'Nizza',
    'Carducci',
    'Spezia'
  ];

  // Insert all stations
  stations.forEach(s => {
    db.run(
      'INSERT INTO stations(name) VALUES(?)',
      [s]
    );
  });

  // lines
  const lines = [
    'Red Line',
    'Blue Line',
    'Green Line',
    'Yellow Line'
  ];

// Insert metro lines
  lines.forEach(l => {
    db.run(
      'INSERT INTO lines(name) VALUES(?)',
      [l]
    );
  });

  // segments
  const segments = [

    // Red Line
    [1, 9, 1],
    [9, 10, 1],
    [10, 3, 1],
    [3, 5, 1],

    // Blue Line
    [2, 6, 2],
    [6, 8, 2],
    [8, 7, 2],

    // Green Line
    [1, 2, 3],
    [2, 3, 3],
    [3, 4, 3],

    // Yellow Line
    [5, 11, 4],
    [11, 12, 4],
    [12, 4, 4]

  ];

// Insert connections between stations
  segments.forEach(s => {
    db.run(
      `
      INSERT INTO segments(
        station1,
        station2,
        lineId
      )
      VALUES(?,?,?)
      `,
      s
    );
  });

  // events
  const events = [
    ['Quiet Journey', 0],
    ['Wrong Platform', -2],
    ['Helpful Passenger', 1],
    ['Train Delay', -3],
    ['Free Coffee', 2],
    ['Lost Ticket', -4],
    ['Fast Connection', 3],
    ['Lucky Day', 4]
  ];

  // Insert random game events
  events.forEach(e => {
    db.run(
      'INSERT INTO events(description,effect) VALUES(?,?)',
      e
    );
  });

  // Demo users for login
  const users = [
    'nima',
    'mario',
    'luca'
  ];

  // Create all users in the database
  Promise.all(
    users.map(async (username) => {
      // Hash the password before saving 
      const hash =
        await bcrypt.hash('1234', 10);

      return new Promise((resolve, reject) => {

        db.run(
          `
          INSERT INTO users(
            username,
            password
          )
          VALUES(?,?)
          `,
          [username, hash],
          (err) => {

            if (err)
              reject(err);
            else
              resolve();

          }
        );

      });

    })
  )
  .then(() => {

    // Seed ranking data
    db.run(
      `
      INSERT INTO games(
        username,
        score
      )
      VALUES(?,?)
      `,
      ['mario', 18]
    );

    db.run(
      `
      INSERT INTO games(
        username,
        score
      )
      VALUES(?,?)
      `,
      ['luca', 12]
    );

    db.close();

  })
  .catch(err => {

    console.error(err);

    db.close();

  });

});