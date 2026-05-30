// ============================================================
// models/serviceModel.js
// This file contains the functions that read and write
// community service records to the database.
// ============================================================
//
// ✏️  TASK (COMMENT): Each function below has a comment placeholder.
//     Replace each placeholder with a real comment that explains:
//       1. What the function does
//       2. What parameters it takes (if any)
//       3. What it returns
//
// ============================================================

const db = require('../db');
// 1. it gathers all community service records from the database, which is followed by the order of the data activity. 
// 2. no parameters 
// 3. it returns a row of objects that represent all service records
// COMMENT FOR getAllRecords:
const getAllRecords = async () => {
  const res = await db.query(
    'SELECT * FROM service_records ORDER BY activity_date DESC'
  );
  return res.rows;
};

// COMMENT FOR addRecord:
// 1. it saves a community service record onto the database 
// 2. Student_name, Student_id, activity_date, Hours, Recipient, so 5 in total.
// 3. it returns a  record of students' names, ID, the hours, etc. 
const addRecord = async (student_name, student_id, activity_date, hours, recipient) => {
  const res = await db.query(
    `INSERT INTO service_records
       (student_name, student_id, activity_date, hours, recipient)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [student_name, student_id, activity_date, hours, recipient]
  );
  return res.rows[0];
};

// COMMENT FOR getHoursByStudent:
// 1. This one calculates the total hours for each Student and sorts them alphabetically by name. 
// 2. no parameters. 
// 3. It returns a row from a list that can contain a student's name, their ID, and the total number of hours they have. 
const getHoursByStudent = async () => {
  const res = await db.query(
    `SELECT student_name, student_id, SUM(hours) AS total_hours
     FROM service_records
     GROUP BY student_name, student_id
     ORDER BY student_name ASC`
  );
  return res.rows;
};

module.exports = { getAllRecords, addRecord, getHoursByStudent };
