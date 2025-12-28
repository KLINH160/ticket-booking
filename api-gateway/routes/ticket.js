const express = require('express');
const router = express.Router();
const axios = require('axios');

// Lấy danh sách vé
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3002/tickets');
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

// Đặt vé
router.post('/book', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3002/tickets', req.body);
    res.status(201).send(response.data);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

module.exports = router;
