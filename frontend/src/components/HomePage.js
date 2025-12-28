import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

// Ảnh mặc định
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dữ liệu fallback nếu API không trả về mảng hợp lệ
  const fallbackData = [
    { 
      _id: "1", 
      eventName: "Liveshow 1000 Năm", 
      artist: "Ca sĩ A", 
      price: 800000, 
      date: "15/03/2025", 
      description: "Đêm nhạc hoành tráng kỷ niệm 1000 năm", 
      image: img1, 
      remaining: 50 
    },
    { 
      _id: "2", 
      eventName: "Đêm nhạc Văn Mai Hương", 
      artist: "Văn Mai Hương", 
      price: 500000, 
      date: "05/02/2025", 
      description: "Live concert đặc biệt của Văn Mai Hương", 
      image: img2, 
      remaining: 30 
    },
    { 
      _id: "3", 
      eventName: "Đêm nhạc Cẩm Ly", 
      artist: "Cẩm Ly", 
      price: 700000, 
      date: "14/02/2025", 
      description: "Đêm nhạc trữ tình cùng ca sĩ Cẩm Ly", 
      image: img3, 
      remaining: 20 
    }
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/tickets')
  // Sử dụng API Gateway (cổng 5000)
      .then(response => {
        console.log("🎟️ API TRẢ VỀ:", response.data);
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        } else {
          console.warn("⚠️ API không trả về mảng hợp lệ, sử dụng fallback data.");
          setEvents(fallbackData);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('❌ Lỗi khi tải danh sách sự kiện:', error);
        setError('Không thể tải dữ liệu từ server');
        setEvents(fallbackData);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">⏳ Đang tải dữ liệu...</p>;
  if (error) return <p className="error">⚠️ {error}</p>;

  return (
    <div className="homepage">
      <h2>🎶 Nhạc Sống</h2>
      <div className="event-list">
        {events.map((event, index) => {
          // Kiểm tra nếu event.image không hợp lệ (rỗng hoặc chỉ khoảng trắng)
          const imageUrl = event.image && event.image.trim() !== ""
            ? event.image
            : // Luân phiên sử dụng fallback images theo index
              index % 3 === 0 ? img1 : index % 3 === 1 ? img2 : img3;
          
          return (
            <div key={event._id} className="event-card">
              <span className="ticket-remaining">🎟️ {event.remaining} vé còn lại</span>
              <img src={event.image && event.image.trim() !== "" ? event.image : (index % 3 === 0 ? img1 : index % 3 === 1 ? img2 : img3)} alt={event.eventName} />

              <h3>{event.eventName}</h3>
              <p><strong>Ca sĩ:</strong> {event.artist}</p>
              <p><strong>📅 Ngày:</strong> {event.date}</p>
              <p><strong>💰 Giá:</strong> {event.price.toLocaleString()} VNĐ</p>
              <p>{event.description}</p>
              <Link to={`/ticket/${event._id}`} className="btn-buy">Xem Chi Tiết</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
