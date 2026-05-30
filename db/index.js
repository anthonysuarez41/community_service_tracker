// ============================================================
// db/index.js
// This file sets up the connection to the PostgreSQL database.
// ============================================================
//
// ✏️  TASK (COMMENT): Add a comment above EACH of the 5 marked sections below
//     explaining what that line or block of code does.
//     Your comments should be in your own words.
//     You will NOT change any of the actual code — only add comments.
//
// ============================================================

// SECTION 1 — This section loads the required node.js modules for any database connections  :
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// SECTION 2 — This section has a constant that creates the database connection using the URL configuration :
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// SECTION 3 — it locates the schema.sql file path and reads it as a text string. :
const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

// SECTION 4 — : it runs the scheme script, so it can build the database tables and uses the console logs to gather the results
(async () => {
  try {
    await pool.query(schema);
    console.log("✅ Tables ensured from schema.sql");
  } catch (err) {
    console.error("❌ Failed to run schema.sql:", err);
  }
})();

// SECTION 5 — add your comment here:
module.exports = pool;
