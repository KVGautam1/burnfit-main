import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import LoginDialog from './LoginDialog'; // Import the dialog component

export default function App() {
  const nav = useNavigate();
  const muscleBoxRefs = useRef([]);
  const stateSectionRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
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
  }, []);

  const loginPage = () => {
    nav('/student-login');
  };

  const BmI = () => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
    } else {
      nav('/bim');
    }
  };

  const time = () => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
    } else {
      nav('/tracker');
    }
  };

  const showTrainers = () => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
    } else {
      nav('/trainers-list');
    }
  };

  const joinAsTrainer = () => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
    } else {
      nav('/join-as-trainer');
    }
  };

  const handleBoxClick = (muscle) => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
    } else {
      nav(`/exercises/${muscle}`);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <header>
        <nav>
          <ul className="menu">
            <li><a onClick={() => nav('/')}>HOME</a></li>
            <li><a onClick={BmI}>BMI</a></li>
            <li><a onClick={time}>TRACKER</a></li>
            <li><a onClick={joinAsTrainer}>TRAINERS</a></li>
            {!isLoggedIn && (
              <li><button className="login-btn" onClick={loginPage}>Login</button></li>
            )}
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>BURNFIT</h1>
          <p>PUSH YOUR LIMITS</p>
          <button className="cta-button" onClick={showTrainers}>Find Trainers</button>
        </section>

        <section className="state-section" ref={stateSectionRef}>
          <p>Know your current state and start your fitness journey</p>
          <button className="cta-button" onClick={BmI}>Check your state</button>
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
            <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[9] = el)} onClick={() => handleBoxClick('Abs')}>
            Abs
            <img src="/abs.png" alt="Abs Workout" className="muscle-image" />
            </div>
            <div className="muscle-box" ref={(el) => (muscleBoxRefs.current[8] = el)} onClick={() => handleBoxClick('Cardio')}>
            Cardio
            <img src="/cardio2.jpg" alt="Cardio Workout" className="muscle-image" />
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
            <a href="#contact">Contact</a>
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
          <div className="footer-column">
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#instagram">Instagram</a>
            <a href="#youtube">YouTube</a>
          </div>
        </div>
      </footer>

      <LoginDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
}
