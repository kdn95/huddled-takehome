import type { PageServerLoad } from './$types';
import Database from 'better-sqlite3'; // Import better-sqlite3

// Create a Database instance (you can customize the path to your database)
const db = new Database('./database/main.db');

export const load: PageServerLoad = async ({ locals }) => {
  // Use locals.db if it's set, else use the direct db connection
  // const database = locals.db || db;

  try {
    // Test query to verify database connection
    const testQuery = db.prepare('SELECT COUNT(*) as count FROM sqlite_master WHERE type="table"');
    const tableCount = testQuery.get();
    console.log('Total number of tables in database:', tableCount.count);

    // Test query to check specific tables
    const artistTableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='artists'");
    const artistTableExists = artistTableCheck.get();
    
    if (!artistTableExists) {
      console.error('Artists table does not exist!');
      throw new Error('Artists table is missing');
    }

    // Test query to count artists
    const artistCountQuery = db.prepare('SELECT COUNT(*) as count FROM artists');
    const artistCount = artistCountQuery.get();
    console.log('Number of artists:', artistCount.count);
  } catch (testError) {
    console.error("Database connection or schema test failed:", testError);
    // Optionally, you could throw the error to stop execution
    throw testError;
  }


  const query = `
  SELECT
    a.id AS artist_id,
    a.name AS artist_name,
    SUM(v.end_time - v.start_time) AS total_visit_duration,
    COUNT(DISTINCT v.session_id) AS unique_session_count
  FROM
    artists a
  JOIN
    visits v ON v.artist_id = a.id
  GROUP BY
    a.id,
    a.name
  ORDER BY
    total_visit_duration DESC;
`;

  try {
    // Use prepare() and all() for synchronous queries in better-sqlite3
    const stmt = database.prepare(query); // Prepare the query

    const data = stmt.all() as {
      artist_id: number;
      artist_name: string;
      total_visit_duration: number;
      unique_session_count: number;
    }[]; // Execute and fetch all results synchronously
      // console.log(query);  // Log the query
      // const rows = db.prepare('PRAGMA table_info(artists);').all();
      // console.log(rows);
      // const data = rows.all();
    // const artistVisits = await stmt.all(); // Execute and fetch results
    return {
      artistVisits, // Pass this to the client
    };
  } catch (error) {
    console.error("Error executing query:", error);
    return {
      data: [],
      error: "Failed to load data",
    };
  }
};
