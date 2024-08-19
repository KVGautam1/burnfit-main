import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './home.css';

const exercises = {
  Underweight: [
    'As you are new to fitness, you have to work on every muscle daily using light weight. Do not overdo the exercise or lift heavy, which may cause muscle injury.',
    'Chest: Bench Press',
    'Back: Pull-Ups',
    'Legs: Squats',
    'Triceps: Tricep Dips',
    'Biceps: Bicep Curls',
    'Cardio: Running',
    'Shoulders: Shoulder Press',
    'Abs: Crunches',
  ],
  Healthy: [
    'As you are already at a healthy state, your main focus is to gain muscles and improve your strength. Follow the workout split below or appoint a trainer for further help:',
    'Monday - Chest, Abs',
    'Tuesday - Shoulders',
    'Wednesday - Back',
    'Thursday - Biceps, Abs',
    'Friday - Triceps',
    'Saturday - Legs, Abs',
    'Sunday - Rest',
  ],
  Overweight: [
    'As your body has a high fat content, your main focus is to reduce body fat and improve your strength and muscle volume. Add 30 mins of cardio to your everyday workout, and consider appointing a trainer for further help.',
    'Monday - Chest',
    'Tuesday - Shoulders',
    'Wednesday - Back',
    'Thursday - Biceps',
    'Friday - Triceps',
    'Saturday - Legs',
    'Sunday - Rest',
  ],
  Chest: ['Bench Press', 'Incline Dumbbell Press', 'Chest Flyes'],
  Back: ['Pull-Ups', 'Bent Over Rows', 'Lat Pulldowns'],
  Legs: ['Squats', 'Deadlifts', 'Leg Press'],
  Triceps: ['Tricep Dips', 'Skull Crushers', 'Tricep Kickbacks'],
  Biceps: ['Bicep Curls', 'Hammer Curls', 'Concentration Curls'],
  Cardio: ['Running', 'Cycling', 'Jump Rope'],
  Shoulders: ['Shoulder Press', 'Lateral Raises', 'Front Raises'],
  Abs: ['Crunches', 'Leg Raises', 'Planks'],
};

export default function ExerciseList() {
  const { muscle } = useParams();
  const navigate = useNavigate();

  // Go back to the previous page if available, otherwise go to home
  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1); // Go back in history
    } else {
      navigate('/'); // Navigate to home if there's no history
    }
  };

  return (
    <div className="exercise-list">
      <h2>Exercises for {muscle}</h2>
      <ul>
        {exercises[muscle].map((exercise, index) => (
          <li key={index} className={(index === 0 && (muscle === 'Underweight' || muscle === 'Healthy' || muscle === 'Overweight')) ? 'no-hover no-bullet' : ''}>
            {exercise}
          </li>
        ))}
      </ul>
      <button className="back-btn" onClick={handleBackClick}>Back to Home</button>
    </div>
  );
}
