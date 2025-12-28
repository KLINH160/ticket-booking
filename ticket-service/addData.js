const mongoose = require('mongoose');
require('dotenv').config();

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

const Ticket = mongoose.model('Ticket', new mongoose.Schema({
  eventName: String,
  artist: String,
  date: String,
  price: Number,
  description: String,
  image: String,
  remaining: Number
}));

// Dữ liệu vé cần thêm
const ticketData = [
  {
    eventName: "Liveshow 1000 Năm",
    artist: "Ca sĩ A",
    date: "2025-03-15",
    price: 800000,
    description: "Mô tả về sự kiện.",
    image: "https://via.placeholder.com/300x200.png?text=Liveshow+1000+Năm",
    remaining: 50
  },
  {
    eventName: "Đêm nhạc Văn Mai Hương",
    artist: "Văn Mai Hương",
    date: "2025-02-05",
    price: 500000,
    description: "Đêm nhạc đỉnh cao.",
    image: "https://via.placeholder.com/300x200.png?text=Văn+Mai+Hương",
    remaining: 30
  },
  {
    eventName: "Đêm nhạc Cẩm Ly",
    artist: "Cẩm Ly",
    date: "2025-02-14",
    price: 700000,
    description: "Đêm nhạc trữ tình cùng Cẩm Ly.",
    image: "https://via.placeholder.com/300x200.png?text=Cẩm+Ly",
    remaining: 20
  }
];

// Thêm dữ liệu vào MongoDB nếu chưa có
const addTickets = async () => {
  try {
    for (const ticket of ticketData) {
      const existingTicket = await Ticket.findOne({ eventName: ticket.eventName, date: ticket.date });
      if (!existingTicket) {
        await Ticket.create(ticket);
        console.log(`Đã thêm vé: ${ticket.eventName}`);
      } else {
        console.log(`Vé ${ticket.eventName} đã tồn tại, bỏ qua.`);
      }
    }
    console.log("Dữ liệu xử lý xong!");
  } catch (error) {
    console.error("Lỗi khi thêm dữ liệu:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Gọi hàm để thêm dữ liệu
addTickets();
