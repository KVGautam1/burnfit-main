import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserBookings.css'; 

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (email) {
          const encodedEmail = encodeURIComponent(email);
          const response = await axios.get(`http://localhost:8080/api/bookings/user/${encodedEmail}`);
          if (Array.isArray(response.data)) {
            setBookings(response.data);
          } else {
            console.error('Unexpected data format:', response.data);
            setError('Unexpected data format received.');
          }
        } else {
          console.error('No email found in local storage');
        }
      } catch (error) {
        console.error('Error fetching bookings', error);
        setError('Unable to fetch bookings. Please try again later.');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="user-bookings-body">
      <header className="user-bookings-header">
        <button onClick={() => navigate(-1)}>Back</button>
        <h1 className="user-bookings-title">Your Bookings</h1>
      </header>
      <main className="user-bookings-main">
        {error && <p className="user-bookings-error-message">{error}</p>}
        {bookings.length > 0 ? (
          <ul className="user-bookings-list">
            {bookings.map((booking, index) => (
              <li key={booking.id} className="user-bookings-list-item">
                <h2 className="booking-number">Booking No: {index + 1}</h2> {/* Booking Number as Heading */}
                <p>Date: {booking.trainingStartDate}</p>
                <p>Time: {booking.preferredTime}</p>
                <p>Session Type: {booking.sessionType}</p>
                <p>Training Seek: {booking.trainingSeek}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </main>
    </div>
  );
}
