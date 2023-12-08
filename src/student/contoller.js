const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Query executed successfully");
      res.status(200).json(results.rows);
    }
  });
};

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          res.status(500).send("Internal Server Error");
        } else {
          console.log("Query executed successfully");
          res.status(200).json(results.rows);
        }
    })
}
const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    // check if email exist
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("email already exists");
        }
        // add student to db
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) {
              console.error("Error executing query:", error);
              res.status(500).send("Internal Server Error");
            } else {
                 console.log("Students added successfully");
                 res.status(200).send("students created successfully");
            }
        })
    })
}

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
};
