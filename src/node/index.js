const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 5403;

const cors = require("cors");
app.use(cors());

const { Pool } = require("pg");
const pool = new Pool({
  user: "user_5403", // PostgreSQLのユーザー名に置き換えてください
  host: "postgres",
  database: "crm_5403", // PostgreSQLのデータベース名に置き換えてください
  password: "pass_5403", // PostgreSQLのパスワードに置き換えてください
  port: 5432,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// 顧客情報を全てGET（list.html)
app.get("/customers", async (req, res) => {
  try {
    const customerData = await pool.query("SELECT * FROM customers");
    res.send(customerData.rows);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// 顧客詳細画面に表示する顧客詳細情報をGET(detail.html)
app.get("/customer/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const customerData = await pool.query(
      "SELECT * FROM customers WHERE customer_id = $1",
      [customerId],
    );
    res.send(customerData.rows[0]);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// 顧客情報を削除するAPI(detail.html)
app.delete("/customer/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const customerData = await pool.query(
      "DELETE FROM customers WHERE customer_id = $1",
      [customerId],
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.send("Error" + err);
  }
});

// POSTに必要なやつ。
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 顧客をPOST(add.html)
app.post("/add-customer", async (req, res) => {
  try {
    const { companyName, industry, contact, location } = req.body;
    const newCustomer = await pool.query(
      "INSERT INTO customers (company_name, industry, contact, location) VALUES ($1, $2, $3, $4) RETURNING *",
      [companyName, industry, contact, location],
    );
    res.json({ success: true, customer: newCustomer.rows[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// 顧客情報を更新PUT(detail.html)
app.put("/customer/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const { companyName, industry, contact, location } = req.body;
    const putCustomer = await pool.query(
      "UPDATE customers SET company_name=$1, industry=$2, contact=$3, location=$4 WHERE customer_id=$5",
      [companyName, industry, contact, location, customerId],
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.use(express.static("public"));
