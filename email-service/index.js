const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

// Thiết lập Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password',
  },
});

// Gửi email xác nhận
app.post('/send-confirmation', (req, res) => {
  const { email } = req.body;
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Booking Confirmation',
    text: 'Your booking has been confirmed!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('Email sent');
  });
});

const PORT = 3005;
app.listen(PORT, () => console.log(`Email Service running on port ${PORT}`));
