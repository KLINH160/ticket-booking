const express = require('express');
const pdfkit = require('pdfkit');
const app = express();
app.use(express.json());

// Tạo hóa đơn PDF
app.post('/generate', (req, res) => {
  const doc = new pdfkit();
  doc.pipe(res);
  doc.text(`Invoice for Order ID: ${req.body.orderId}`);
  doc.text(`Amount: ${req.body.amount}`);
  doc.end();
});

const PORT = 3004;
app.listen(PORT, () => console.log(`Invoice Service running on port ${PORT}`));
