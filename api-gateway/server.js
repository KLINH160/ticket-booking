require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Proxy cho Auth Service (không dùng pathRewrite)


app.use('/api/auth', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true
}));


// Proxy cho Ticket Service: chuyển tiếp từ /api/tickets thành /tickets
app.use("/api/tickets", createProxyMiddleware({
  target: "http://localhost:5002",  // Địa chỉ của ticket-service
  changeOrigin: true,
  pathRewrite: { '^/api/tickets': '/tickets' }
}));

// Proxy cho Payment Service (nếu cần)
app.use("/api/payment", createProxyMiddleware({
  target: "http://localhost:5003",  // Địa chỉ của payment-service
  changeOrigin: true,
  pathRewrite: { '^/api/payment': '' }
}));

app.get("/", (req, res) => {
  res.send("API Gateway đang chạy!");
});

app.listen(PORT, () => {
  console.log(`API Gateway chạy tại http://localhost:${PORT}`);
});
