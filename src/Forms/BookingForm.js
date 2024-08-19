import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BookingForm.css';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    trainingStartDate: '',
    preferredTime: '',
    sessionType: 'online',
    trainingSeek: '',
    email: '', // Email field
    trainerId: '' // Trainer ID field
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setFormData(prevData => ({
        ...prevData,
        email
      }));
    }

    // Get trainerId from location state if available
    const { trainerId } = location.state || {};
    if (trainerId) {
      setFormData(prevData => ({
        ...prevData,
        trainerId
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Appointment booked!');
        navigate('/app-login-student'); // Navigate to AppLoginStudent.js
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="booking-form-wrapper">
      <div className="booking-form-container">
        <h1>Book Your Appointment</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              disabled // Email field is read-only
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
            />
          </label>
          <label>
            Weight:
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter your weight"
              required
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Enter your height"
              required
            />
          </label>
          <label>
            Training Start Date:
            <input
              type="date"
              name="trainingStartDate"
              value={formData.trainingStartDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Preferred Time:
            <input
              type="text"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              placeholder="Enter your preferred time"
              required
            />
          </label>
          <label>
            Session Type:
            <select
              name="sessionType"
              value={formData.sessionType}
              onChange={handleChange}
              required
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </label>
          <label>
            Training Seek:
            <input
              type="text"
              name="trainingSeek"
              value={formData.trainingSeek}
              onChange={handleChange}
              placeholder="Enter what training you seek"
              required
            />
          </label>
          <label>
            Trainer ID:
            <input
              type="text"
              name="trainerId"
              value={formData.trainerId}
              onChange={handleChange}
              placeholder="Enter the trainer's ID"
              required
            />
          </label>
          <button type="submit" className="booking-form-submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}