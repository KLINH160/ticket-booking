import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TicketDetailPage.css';

function TicketDetailPage() {
  const { id } = useParams();  // Lấy id từ URL
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tickets/${id}`)
      .then(response => {
        console.log("🎟️ Vé chi tiết nhận được:", response.data);
        setTicket(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("❌ Lỗi khi tải chi tiết vé:", error);
        setError("Không thể tải dữ liệu vé!");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">⏳ Đang tải chi tiết vé...</p>;
  if (error) return <p className="error">⚠️ {error}</p>;
  if (!ticket) return <p className="error">⚠️ Vé không tồn tại!</p>;

  return (
    <div className="ticket-detail-page">
      <div className="ticket-container">
        <img src={ticket.image} alt={ticket.eventName} className="ticket-image" />
        <h2>{ticket.eventName}</h2>
        <p><strong>Ca sĩ:</strong> {ticket.artist}</p>
        <p><strong>📅 Ngày:</strong> {ticket.date}</p>
        <p><strong>💰 Giá:</strong> {ticket.price.toLocaleString()} VNĐ</p>
        <p><strong>📜 Mô tả:</strong> {ticket.description}</p>
        <p><strong>🎟️ Vé còn lại:</strong> {ticket.remaining}</p>
        <button className="btn-buy">Đặt Vé Ngay</button>
      </div>
    </div>
  );
}

export default TicketDetailPage;
