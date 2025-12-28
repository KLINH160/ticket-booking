import React from 'react';
import './DashboardPage.css';

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Quản Lý Sự Kiện & Vé</h1>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Vé Đã Đặt</h2>
          <p>Kiểm tra danh sách vé đã đặt của bạn.</p>
          <button>Xem Chi Tiết</button>
        </div>

        <div className="dashboard-section">
          <h2>Quản Lý Thanh Toán</h2>
          <p>Xem lịch sử thanh toán và hóa đơn.</p>
          <button>Xem Thanh Toán</button>
        </div>

        <div className="dashboard-section">
          <h2>Hỗ Trợ Khách Hàng</h2>
          <p>Liên hệ hỗ trợ khi gặp vấn đề với đặt vé.</p>
          <button>Liên Hệ</button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
