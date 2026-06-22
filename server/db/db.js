import sqlite3 from 'sqlite3';

// Open the SQLite database used by the application
const db = new sqlite3.Database('./db/last-race.sqlite');

// Export the database connection
export default db;