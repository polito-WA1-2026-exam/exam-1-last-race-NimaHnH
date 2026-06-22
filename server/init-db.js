import db from './db/db.js';
// Create the database schema from scratch

// Execute all database operations in order
db.serialize(() => {


  // Remove existing tables if they already exist
  db.run(`DROP TABLE IF EXISTS games`);
  db.run(`DROP TABLE IF EXISTS events`);
  db.run(`DROP TABLE IF EXISTS segments`);
  db.run(`DROP TABLE IF EXISTS stations`);
  db.run(`DROP TABLE IF EXISTS lines`);
  db.run(`DROP TABLE IF EXISTS users`);

  // Save user credentials
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  
  db.run(`
    CREATE TABLE stations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE
    )
  `);

  db.run(`
    CREATE TABLE lines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE
    )
  `);
// Save connections between stations
  db.run(`
    CREATE TABLE segments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      station1 INTEGER,
      station2 INTEGER,
      lineId INTEGER
    )
  `);

  db.run(`
    CREATE TABLE events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      effect INTEGER
    )
  `);
// Player scores
  db.run(`
CREATE TABLE games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  score INTEGER
)
  `);

});

db.close();

