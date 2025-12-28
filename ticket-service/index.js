const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const app = express();

app.use(express.json());

// 1. Kết nối MongoDB (Lấy từ biến môi trường Docker)
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ticket-service';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Ticket Service: Đã kết nối MongoDB'))
.catch(err => console.error('❌ Lỗi kết nối Mongo:', err));

// 2. Kết nối Redis (Lấy từ biến môi trường Docker)

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = redis.createClient({
    url: redisUrl 
});

redisClient.on('error', (err) => console.log('❌ Redis Client Error', err));

(async () => {
    await redisClient.connect();
    console.log('✅ Ticket Service: Đã kết nối Redis');
})();

// Schema và Routes giữ nguyên như cũ
const ticketSchema = new mongoose.Schema({ title: String, price: Number });
const Ticket = mongoose.model('Ticket', ticketSchema);

app.get('/tickets', async (req, res) => {
  try {
      const cachedTickets = await redisClient.get('tickets');
      if (cachedTickets) {
          console.log("⚡ Lấy vé từ Cache Redis");
          return res.status(200).send(JSON.parse(cachedTickets));
      }

      const tickets = await Ticket.find();
      await redisClient.set('tickets', JSON.stringify(tickets), { EX: 60 }); // Cache 60s
      console.log("🐢 Lấy vé từ Database");
      res.status(200).send(tickets);
  } catch (e) {
      res.status(500).json({error: e.message});
  }
});

app.post('/tickets', async (req, res) => {
  const ticket = new Ticket(req.body);
  await ticket.save();
  await redisClient.del('tickets'); // Xóa cache khi có dữ liệu mới
  res.status(201).send(ticket);
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Ticket Service running on port ${PORT}`));