const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();
const app = express();

const port = 5000;

app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM employee");

    res.status(201).json({
      message: `success`,
      data: user.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    const {
      name,
      img,
      email,
      password,
      department,
      leavestatus,
      isadmin,
      passreset,
    } = req.body;

    const newEmployee = await pool.query(
      "INSERT INTO employee (name, img, email, department, leaveStatus, isAdmin, passReset, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [name, img, email, department, leavestatus, isadmin, passreset, password]
    );

    res.status(201).json({
      message: `Successfully created a new employee with ${name} and ${email}`,
      data: newEmployee.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { name, img, password, department, leavestatus, isadmin, passreset } =
      req.body.body;

    const user = await pool.query(
      "UPDATE employee SET name=$1, img=$2, password=$3, department=$4, leavestatus=$5, isadmin=$6, passreset=$7 WHERE email=$8 RETURNING *",
      [name, img, password, department, leavestatus, isadmin, passreset, email]
    );

    res.status(201).json({
      message: `success`,
      data: user.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
