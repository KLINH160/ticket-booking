const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Momo Payment Gateway API
const MOMO_API_URL = 'https://test-payment.momo.vn/gw_payment/transactionProcessor';

app.post('/process', async (req, res) => {
  try {
    const paymentData = {
      // Thông tin thanh toán gửi tới Momo
      partnerCode: 'MOMO_PARTNER_CODE',
      accessKey: 'MOMO_ACCESS_KEY',
      requestId: 'unique_request_id',
      amount: req.body.amount,
      orderId: req.body.orderId,
      returnUrl: 'http://localhost:3003/payment/callback',
    };

    const response = await axios.post(MOMO_API_URL, paymentData);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));
