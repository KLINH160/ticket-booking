import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TicketDetailPage from './pages/TicketDetailPage';

import BookingForm from "./components/BookingForm"; 
import PaymentConfirmation from "./components/PaymentConfirmation"; 
import logo from "./logo.svg";  // Đảm bảo file này tồn tại


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
       
            <Route path="/ticket/:id" element={<TicketDetailPage />} />



            <Route path="/booking/:ticketId" element={<BookingForm />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
