import db from './db/db.js';
import bcrypt from 'bcrypt';

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

  lines.forEach(l => {
    db.run(
      'INSERT INTO lines(name) VALUES(?)',
      [l]
    );
  });

// segments

const segments = [

  // Red Line (lineId = 1)
  [1, 9, 1],
  [9, 3, 1],
  [3, 5, 1],

  // Blue Line (lineId = 2)
  [2, 6, 2],
  [6, 8, 2],
  [8, 7, 2],

  // Green Line (lineId = 3)
  [1, 2, 3],
  [2, 3, 3],
  [3, 4, 3],

  // Yellow Line (lineId = 4)
  [5, 11, 4],
  [11, 12, 4],
  [12, 4, 4]

];

segments.forEach(s => {
  db.run(
    `INSERT INTO segments(station1,station2,lineId)
     VALUES(?,?,?)`,
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

  events.forEach(e => {
    db.run(
      'INSERT INTO events(description,effect) VALUES(?,?)',
      e
    );
  });

const users = [
  'nima',
  'mario',
  'luca'
];

Promise.all(
  users.map(async (username) => {

    const hash = await bcrypt.hash('1234', 10);

    return new Promise((resolve, reject) => {

      db.run(
        'INSERT INTO users(username,password) VALUES(?,?)',
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

  db.close();

})
.catch(err => {

  console.error(err);

  db.close();

});

});