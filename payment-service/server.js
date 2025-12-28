require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(require("cors")());

app.get("/", (req, res) => {
  res.send("Payment Service đang chạy!");
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Payment Service chạy trên http://localhost:${PORT}`);
});
