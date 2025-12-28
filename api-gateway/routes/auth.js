const express = require('express');
const router = express.Router();
const axios = require('axios');

// Đăng ký người dùng
router.post('/register', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3001/register', req.body);
    res.status(201).send(response.data);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

// Đăng nhập người dùng
router.post('/login', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3001/login', req.body);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

module.exports = router;
