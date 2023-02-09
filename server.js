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

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
