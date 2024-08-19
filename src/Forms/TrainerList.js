import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import './TrainerList.css'; // Ensure the path is correct

export default function TrainersList() {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/trainers');
        if (response.ok) {
          const data = await response.json();
          setTrainers(data);
        } else {
          console.error('Failed to fetch trainers:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []);

  const handleBookClick = (trainerId) => {
    navigate('/booking-form', { state: { trainerId } }); // Pass trainerId in route state
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="trainers-list">
      <header>
        <h1>Available Trainers</h1>
        <button className="back-btn" onClick={handleBackClick}>
          Back
        </button>
      </header>
      <main>
        <div className="trainer-list">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="trainer-card">
              <Avatar 
                alt={`${trainer.name} profile`} 
                src={trainer.profilePic || ''} // Use empty string if profilePic is not provided
                className="profile-pic"
              />
              <h2>{trainer.name}</h2>
              <p>Age: {trainer.age}</p>
              <p>Specialization: {trainer.specialization}</p>
              <p>Languages: {trainer.preferableLanguageOne}, {trainer.preferableLanguageTwo}</p>
              <p>Experience: {trainer.experience} years</p>
              <div className="button-group">
                <button 
                  className="check-availability-btn"
                  onClick={() => alert(`Available: ${trainer.available}`)}
                >
                  Check Availability
                </button>
                <button 
                  className="book-appointment-btn"
                  onClick={() => handleBookClick(trainer.id)} // Pass trainer.id here
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
      
    </footer>
    </div>
  );
}
