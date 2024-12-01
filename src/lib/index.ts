// place files you want to import through the `$lib` alias in this folder.

// import { Database } from "bun:sqlite";

// const db = new Database("db.sqlite");

// console.log(db.query("SELECT 1 as x").get()); 
// // { x: 1 }
// import Database from 'better-sqlite3';

// const db = new Database('./database/main.db', { verbose: console.log });

// export function getArtistVisits() {
//   const sql = `
//   SELECT
//     a.id AS artist_id,
//     a.name AS artist_name,
//     SUM(v.end_time - v.start_time) AS total_visit_duration,
//     COUNT(DISTINCT v.session_id) AS unique_session_count
//   FROM
//     artists a
//   JOIN
//     visits v ON v.artist_id = a.id
//   GROUP BY
//     a.id,
//     a.name
//   ORDER BY
//     total_visit_duration DESC;
//   `;
//     const stmnt = db.prepare(sql);
//     const rows = stmnt.all();
//     return rows;
// }

