require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Ticket Service: Kết nối MongoDB thành công!'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

const TicketSchema = new mongoose.Schema({
  eventName: String,
  artist: String,
  date: String,
  price: Number,
  description: String,
  image: String,
  remaining: Number
});
const Ticket = mongoose.model('Ticket', TicketSchema);

app.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách vé:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách vé' });
  }
});

app.get('/tickets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Nhận yêu cầu GET vé với ID: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID vé không hợp lệ!' });
    }
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Không tìm thấy vé!' });
    }
    res.json(ticket);
  } catch (error) {
    console.error('Lỗi server khi lấy vé:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

app.post('/tickets', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error('❌ Lỗi khi tạo vé mới:', error);
    res.status(500).json({ message: 'Lỗi server khi tạo vé' });
  }
});

const PORT_TS = process.env.PORT || 5002;
app.listen(PORT_TS, () => console.log(`🚀 Ticket Service chạy trên cổng ${PORT_TS}`));
