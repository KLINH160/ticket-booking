import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      } else {
        alert(data.error || "Lỗi đăng ký!");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert("Lỗi kết nối đến server!");
    }
  };

  return (
    <div className="register-container">
      <h2>Đăng Ký</h2>
      <form onSubmit={handleRegister}>
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

        <div className="form-group">
          <label>Nhập lại mật khẩu</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Nhập lại mật khẩu..."
          />
        </div>

        <button type="submit" className="register-btn">Đăng Ký</button>
      </form>

      <p className="login-link">
        Đã có tài khoản? <span onClick={() => navigate("/login")}>Đăng nhập ngay</span>
      </p>
    </div>
  );
};

export default RegisterPage;
