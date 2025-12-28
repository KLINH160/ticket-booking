import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("📤 Gửi yêu cầu đăng nhập:", { phone, password });

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      console.log("📥 Phản hồi từ server:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Dữ liệu nhận được:", data);

      localStorage.setItem("token", data.token);
      alert("Đăng nhập thành công!");
      navigate("/"); // Chuyển hướng về trang chủ hoặc Dashboard
    } catch (error) {
      console.error("🚨 Lỗi đăng nhập:", error);
      setError(error.message);
      alert("Lỗi kết nối đến server: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Nhập số điện thoại..."
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu..."
          />
        </div>
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
      <p className="register-link">
        Chưa có tài khoản? <span onClick={() => navigate("/register")}>Đăng ký ngay</span>
      </p>
    </div>
  );
};

export default LoginPage;
