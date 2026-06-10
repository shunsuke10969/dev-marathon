const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

const port = 5646;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const pool = new Pool({
  user: "user_5646",
  host: "db",
  database: "crm_5646",
  password: "pass_5646",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Good Morning!");
});

app.post("/add-customer", async (req, res) => {
  try {
    const { companyName, industry, contact, location } = req.body;

    await pool.query(
      "INSERT INTO customers (company_name, industry, contact, location) VALUES ($1, $2, $3, $4)",
      [companyName, industry, contact, location]
    );

    res.send("登録成功");
  } catch (err) {
    console.error(err);
    res.send("DBエラー");
  }
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});