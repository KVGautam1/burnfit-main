import React, { useState } from 'react';
import './Bim1.css'; // Import your stylesheet
import { useNavigate } from 'react-router-dom';

const BMICalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); // 'm' for male, 'f' for female
  const [height, setHeight] = useState(''); // Change initial state to an empty string
  const [weight, setWeight] = useState(''); // Change initial state to an empty string
  const [result, setResult] = useState(''); // State to store the result
  const navigate = useNavigate(); // Correctly naming the variable

  const findWorkouts = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const validateForm = (e) => {
    e.preventDefault(); // Prevent form submission
    if (age && gender && height && weight) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmi = weight / (heightInMeters * heightInMeters);

      let result = '';
      if (bmi < 18.5) {
        result = 'Underweight';
      } else if (bmi >= 18.5 && bmi < 25) {
        result = 'Healthy';
      } else if (bmi >= 25 && bmi < 30) {
        result = 'Overweight';
      } else if (bmi >= 30 && bmi < 35) {
        result = 'Obese';
      } else if (bmi >= 35) {
        result = 'Extremely Obese';
      }

      setResult(`You are: ${result}`);
    } else {
      setResult('Please fill in all fields!');
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.id);
  };

  return (
    <div className="bmi-container">
      <h3 className='st'>
        <b className='bold'>B</b>ody <b className='bold'>M</b>ass <b className='bold'>I</b>ndex Calculator
      </h3>
      <form className="form" id="form" onSubmit={validateForm}>
        <div className="row-one">
          <label>
            Age
            <input
              type="text"
              className="text-input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              autoComplete="off"
              required
              placeholder="Age"
            />
          </label>
          <label className="container">
            <input
              type="radio"
              name="radio"
              id="f"
              checked={gender === 'f'}
              onChange={handleGenderChange}
            />
            <p className="text">Female</p>
            <span className="checkmark"></span>
          </label>
          <label className="container">
            <input
              type="radio"
              name="radio"
              id="m"
              checked={gender === 'm'}
              onChange={handleGenderChange}
            />
            <p className="text">Male</p>
            <span className="checkmark"></span>
          </label>
        </div>

        <div className="row-two">
          <label>
            Height
            <input
              type="text"
              className="text-input"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              autoComplete="off"
              required
              placeholder="Height (cm)"
            />
          </label>
          <label>
            Weight
            <input
              type="text"
              className="text-input"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              autoComplete="off"
              required
              placeholder="Weight (kg)"
            />
          </label>
        </div>
        <button type="submit" id="submit">Submit</button>
        {result && <p className="result">{result}</p>}
        {result && <a className='find-workouts' onClick={findWorkouts}>Find your workouts</a>}
      </form>
    </div>
  );
};

export default BMICalculator;
