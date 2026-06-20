import db from './db.js';

export function getUser(username) {

  return new Promise((resolve, reject) => {

    db.get(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (err, row) => {

        if (err)
          reject(err);
        else
          resolve(row);

      }
    );

  });

}
export function getAllStations() {
  return new Promise((resolve, reject) => {

    db.all(
      'SELECT * FROM stations',
      [],
      (err, rows) => {

        if (err)
          reject(err);
        else
          resolve(rows);

      }
    );

  });
}

export function getAllSegments() {
  return new Promise((resolve, reject) => {

    db.all(
      'SELECT * FROM segments',
      [],
      (err, rows) => {

        if (err)
          reject(err);
        else
          resolve(rows);

      }
    );

  });
}

export function getRandomStations() {

  return new Promise((resolve, reject) => {

    db.all(
      'SELECT * FROM stations',
      [],
      (err, rows) => {

        if (err)
          reject(err);
        else
          resolve(rows);

      }
    );

  });

}

export function getSegmentsWithNames() {

  return new Promise((resolve, reject) => {

    db.all(
      `
      SELECT
        segments.id,
        s1.name AS station1,
        s2.name AS station2,
        segments.lineId
      FROM segments
      JOIN stations s1
        ON segments.station1 = s1.id
      JOIN stations s2
        ON segments.station2 = s2.id
      `,
      [],
      (err, rows) => {

        if (err)
          reject(err);
        else
          resolve(rows);

      }
    );

  });

}

export function getAllEvents() {

  return new Promise((resolve, reject) => {

    db.all(
      'SELECT * FROM events',
      [],
      (err, rows) => {

        if (err)
          reject(err);
        else
          resolve(rows);

      }
    );

  });

}