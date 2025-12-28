const express = require('express');
const router = express.Router();
const axios = require('axios');

// Route: Tạo thanh toán
router.post('/process', async (req, res) => {
  try {
    // Gửi yêu cầu đến Payment Service
    const response = await axios.post('http://localhost:3003/process', req.body);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error in Payment API:', error.message);
    res.status(500).send('Failed to process payment');
  }
});

// Route: Kiểm tra trạng thái thanh toán (nếu cần)
router.get('/status/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;
    // Giả sử có một endpoint ở Payment Service để kiểm tra trạng thái thanh toán
    const response = await axios.get(`http://localhost:3003/status/${paymentId}`);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error in Payment API:', error.message);
    res.status(500).send('Failed to fetch payment status');
  }
});

module.exports = router;
