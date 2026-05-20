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
  user: "user_shuns_watanabe",
  host: "localhost",
  database: "db_shuns_watanabe",
  password: "5Rw5YDaWc5jc",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Good Morning!");
});

app.post("/add-customer", async (req, res) => {

  try {

    const { companyName, industry, contact, location } = req.body;

    const newCustomer = await pool.query(
      "INSERT INTO customers (company_name, industry, contact, location) VALUES ($1, $2, $3, $4) RETURNING *",
      [companyName, industry, contact, location]
    );

    res.json({
      success: true,
      customer: newCustomer.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/customers", async (req, res) => {

  try {

    const customerData = await pool.query(
      "SELECT * FROM customers ORDER BY id ASC"
    );

    res.json(customerData.rows);

  } catch (err) {

    console.error(err);

    res.send("取得エラー");
  }
});

app.get("/customer/:id", async (req, res) => {

  try {

    const id = req.params.id;

    const customer = await pool.query(
      "SELECT * FROM customers WHERE id = $1",
      [id]
    );

    res.json(customer.rows[0]);

  } catch (err) {

    console.error(err);

    res.send("取得エラー");
  }
});

app.delete("/customer/:id", async (req, res) => {

  try {

    const id = req.params.id;

    await pool.query(
      "DELETE FROM customers WHERE id = $1",
      [id]
    );

    res.json({ success: true });

  } catch (err) {

    console.error(err);

    res.json({ success: false });
  }
});

app.put("/customer/:id", async (req, res) => {

  try {

    const id = req.params.id;

    const {
      companyName,
      industry,
      contact,
      location
    } = req.body;

    await pool.query(
      `
      UPDATE customers
      SET
        company_name = $1,
        industry = $2,
        contact = $3,
        location = $4
      WHERE id = $5
      `,
      [
        companyName,
        industry,
        contact,
        location,
        id
      ]
    );

    res.json({ success: true });

  } catch (err) {

    console.error(err);

    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});