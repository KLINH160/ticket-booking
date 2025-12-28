import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/logo.svg" alt="Ticket Booking" />
          </Link>
        </div>
        
        {/* Thanh tìm kiếm đặt riêng biệt */}
        <div className="search-container">
          <input type="text" placeholder="Tìm kiếm sự kiện..." className="search-box" />
        </div>

        <nav className="nav">
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/booking">Vé đã mua</Link></li>
            <li><Link to="/login" className="login-btn">Đăng nhập</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
