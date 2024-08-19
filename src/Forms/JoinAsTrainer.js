import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './joinAsTrainer.css';

export default function JoinAsTrainer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    localityDistrict: '',
    localityState: '',
    preferableLanguageOne: '',
    preferableLanguageTwo: '',
    preferableLanguageThree: '',
    preferableLanguageToTrainOne: '',
    preferableLanguageToTrainTwo: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setFormErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setFormErrors({ email: '' });

    try {
      const response = await fetch('http://localhost:8080/api/trainers/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate(-1); // Navigate back to the previous page after successful submission
      } else {
        console.error('Failed to join as a trainer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="join-trainer-container">
      <h1>Join as a Trainer</h1>
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
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
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
          />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        </label>
        <label>
          Phone:
          <div className="phone-input">
            <span>+91</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </label>
        <label>
          Specialization:
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="eg. Weight lifting, power lifting, calisthenics, yoga, etc."
            required
          />
        </label>
        <label>
          Experience:
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Years of experience"
            required
          />
        </label>
        <label>
          Language Known:
          <select
            name="preferableLanguageOne"
            value={formData.preferableLanguageOne}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Language 1</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </select>
          <select
            name="preferableLanguageTwo"
            value={formData.preferableLanguageTwo}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Language 2</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </select>
          <select
            name="preferableLanguageThree"
            value={formData.preferableLanguageThree}
            onChange={handleChange}
          >
            <option value="" disabled>Select Language 3</option>
            <option value="None">None</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </select>
        </label>
        <label>
          Locality:
          <input
            type="text"
            name="localityDistrict"
            value={formData.localityDistrict}
            onChange={handleChange}
            placeholder="District"
            required
          />
          <input
            type="text"
            name="localityState"
            value={formData.localityState}
            onChange={handleChange}
            placeholder="State"
            required
          />
        </label>
        <label>
          Preferable Language to Train Clients:
          <select
            name="preferableLanguageToTrainOne"
            value={formData.preferableLanguageToTrainOne}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Language 1</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </select>
          <select
            name="preferableLanguageToTrainTwo"
            value={formData.preferableLanguageToTrainTwo}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Language 2</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </select>
        </label>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
