import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';

export default function AppNoLogin() {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const muscleBoxRefs = useRef([]);
  const stateSectionRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (email) {
          const encodedEmail = encodeURIComponent(email); // URL encode email
          const response = await axios.get(`http://localhost:8080/api/users/profile/${encodedEmail}`);
          if (response.data) {
            setUserName(response.data.firstName);
          }
        } else {
          console.error('No email found in local storage');
        }
      } catch (error) {
        console.error('Error fetching user data', error);
        setError('Unable to fetch user data. Please try again later.');
      }
    };

    fetchUserData();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    muscleBoxRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    if (stateSectionRef.current) {
      observer.observe(stateSectionRef.current);
    }

    return () => {
      muscleBoxRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      if (stateSectionRef.current) {
        observer.unobserve(stateSectionRef.current);
      }
    };
  }, [userName]);

  const handleNavigation = (path) => {
    nav(path);
  };

  const handleBoxClick = (muscle) => {
    nav(`/exercises/${muscle}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    nav('/student-login'); // Redirect to StudentLogin.js
  };

  return (
    <div>
      <header>
        <div className="header-content">
          <nav>
            <ul className="menu">
              <li className="welcome-text">Welcome {userName}!</li>
              <li></li>
              <li><a onClick={() => handleNavigation('/bim')}>BMI</a></li>
              <li><a onClick={() => handleNavigation('/tracker')}>TRACKER</a></li>
              <li><a onClick={() => handleNavigation('/join-as-trainer')}>TRAINERS</a></li>
              <li><a onClick={() => handleNavigation('/appointments')}>APPOINTMENTS</a></li>
              <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>BURNFIT</h1>
          <p>PUSH YOUR LIMITS</p>
          <button className="cta-button" onClick={() => handleNavigation('/trainers-list')}>Find Trainers</button>
          {error && <p className="error-message">{error}</p>}
        </section>

        <section className="state-section" ref={stateSectionRef}>
          <p>Know your current state and start your fitness journey</p>
          <button className="cta-button" onClick={() => handleNavigation('/bim')}>Check your state</button>
        </section>

        <section className="content">
          <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[0] = el)} onClick={() => handleBoxClick('Underweight')}>
            Underweight
            <img src="/underweight.png" alt="Underweight Workout" className="muscle-image" />
          </div>
          <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[1] = el)} onClick={() => handleBoxClick('Healthy')}>
            Healthy
            <img src="/healthy.png" alt="Healthy Workout" className="muscle-image" />
          </div>
          <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[2] = el)} onClick={() => handleBoxClick('Overweight')}>
            Overweight
            <img src="/overweight2.png" alt="Overweight Workout" className="muscle-image" />
          </div>
          <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[3] = el)} onClick={() => handleBoxClick('Chest')}>
            Chest
            <img src="/chest.png" alt="Chest Workout" className="muscle-image" />
          </div>
          <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[4] = el)} onClick={() => handleBoxClick('Back')}>
            Back
            <img src="/back.png" alt="Back Workout" className="muscle-image" />
          </div>
          <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[5] = el)} onClick={() => handleBoxClick('Legs')}>
            Legs
            <img src="/leg.png" alt="Leg Workout" className="muscle-image" />
          </div>
          <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[6] = el)} onClick={() => handleBoxClick('Triceps')}>
            Triceps
            <img src="/tris.jpg" alt="Triceps Workout" className="muscle-image" />
          </div>
          <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[7] = el)} onClick={() => handleBoxClick('Biceps')}>
            Biceps
            <img src="/biceps.png" alt="Biceps Workout" className="muscle-image" />
          </div>
          <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[8] = el)} onClick={() => handleBoxClick('Cardio')}>
            Cardio
            <img src="/cardio2.jpg" alt="Cardio Workout" className="muscle-image" />
          </div>
          <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[9] = el)} onClick={() => handleBoxClick('Abs')}>
            Abs
            <img src="/abs.png" alt="Abs Workout" className="muscle-image" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-column">
            <a href="#workouts">Workouts</a>
            <a href="#meals">Meals</a>
            <a href="#success-stories">Success stories</a>
            <a href="#articles">Articles</a>
          </div>
          <div className="footer-column">
            <a href="#about">About</a>
            <a href="#careers">Careers</a>
            <a href="#press">Press</a>
            <a href="#help-center">Help center</a>
          </div>
          <div className="footer-column">
            <a href="#terms-of-service">Terms of service</a>
            <a href="#privacy-policy">Privacy policy</a>
            <a href="#cookies-policy">Cookies policy</a>
            <a href="#impressum">Impressum</a>
          </div>
        </div>
        <div className="social-links">
          <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#instagram"><i className="fab fa-instagram"></i></a>
          <a href="#twitter"><i className="fab fa-twitter"></i></a>
          <a href="#youtube"><i className="fab fa-youtube"></i></a>
        </div>
      </footer>
    </div>
  );
}
