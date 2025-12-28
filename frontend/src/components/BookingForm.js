import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BookingForm.css";

function BookingForm() {
  const { id } = useParams(); // Lấy ID từ URL
  const [ticket, setTicket] = useState(null);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5001/api/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => setTicket(data))
      .catch((err) => console.error("Lỗi khi tải vé:", err));
  }, [id]);

  const handleBooking = () => {
    fetch("http://localhost:5002/api/bookings", { // Gửi đến booking-service
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketId: id, phone }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => console.error("Lỗi khi đặt vé:", err));
  };

  if (!ticket) return <p>Đang tải vé...</p>;

  return (
    <div className="booking-form">
      <h2>Đặt vé: {ticket.eventName}</h2>
      <p>Giá: {ticket.price} VNĐ</p>
      <input
        type="text"
        placeholder="Nhập số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleBooking}>Xác nhận đặt vé</button>
    </div>
  );
}

export default BookingForm;
