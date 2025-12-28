require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("🚨 Lỗi kết nối MongoDB:", err));

// Model User
const UserSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// Kiểm tra service hoạt động
app.get("/health", (req, res) => {
  res.json({ message: "Auth Service đang hoạt động!" });
});

// Đăng ký
app.post("/register", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const existingUser = await User.findOne({ phone });

    if (existingUser) return res.status(400).json({ error: "Số điện thoại đã tồn tại!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ phone, password: hashedPassword });
    await newUser.save();
    res.json({ message: "Đăng ký thành công!" });
  } catch (error) {
    console.error("🚨 Lỗi đăng ký:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
});

// Đăng nhập
// Đăng nhập người dùng (Auth Service)
app.post("/api/auth/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: "Tài khoản không tồn tại!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Mật khẩu không đúng!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Đăng nhập thành công!", token });
  } catch (error) {
    console.error("🚨 Lỗi đăng nhập:", error);
    res.status(500).json({ error: "Đăng nhập thất bại!" });
  }
});



app.listen(PORT, () => {
  console.log(`✅ Auth Service chạy trên http://localhost:${PORT}`);
});
