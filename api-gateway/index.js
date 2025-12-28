require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Lấy địa chỉ từ biến môi trường (được set trong docker-compose.yml)

const AUTH_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:5001';
const TICKET_URL = process.env.TICKET_SERVICE_URL || 'http://localhost:5002';
const PAYMENT_URL = process.env.PAYMENT_SERVICE_URL || 'http://localhost:5003';

console.log(`Gateway Config: Auth->${AUTH_URL}, Ticket->${TICKET_URL}`);

// Proxy cho Auth Service
app.use('/api/auth', createProxyMiddleware({
    target: AUTH_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/auth': '',
    }
}));


// Proxy cho Ticket Service
app.use("/api/tickets", createProxyMiddleware({
  target: TICKET_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/tickets': '/tickets' } // Gateway /api/tickets -> Service /tickets
}));

app.get("/", (req, res) => {
  res.send("API Gateway đang chạy trong Docker!");
});

app.listen(PORT, () => {
  console.log(`API Gateway chạy tại cổng ${PORT}`);
});
