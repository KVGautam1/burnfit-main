import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserBookings.css'; // Ensure the path is correct

export default function UserBookings() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [trainerId, setTrainerId] = useState(''); // Add trainerId state

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (trainerId) {
          const response = await axios.get(`http://localhost:8080/api/bookings/trainer/${trainerId}`);
          console.log(response.data); // Log the response data
          
          // Ensure response.data is an array
          if (Array.isArray(response.data)) {
            setAppointments(response.data);
          } else {
            throw new Error('Unexpected data format');
          }
        }
      } catch (error) {
        console.error('Error fetching appointments', error);
        setError('Unable to fetch appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [trainerId]); // Re-fetch when trainerId changes

  return (
    <div className="user-bookings">
      <header>
        <h1>Client Bookings</h1>
      </header>

      <main>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : appointments.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Age</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Preferred Time</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.name}</td>
                  <td>{appointment.age}</td>
                  <td>{appointment.height}</td>
                  <td>{appointment.weight}</td>
                  <td>{appointment.preferredTime}</td>
                  <td>{new Date(appointment.trainingStartDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
