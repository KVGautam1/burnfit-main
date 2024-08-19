import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './Components/App';
import AppLoginTrainer from './Components/AppLoginTrainer';
import AppLoginStudent from './Components/AppLoginStudent';
import Bim from './Components/Bim2';
import Sign from './Login&Signup/SignUp'; // Ensure this is the correct import
import Ap from './Components/st';
import TrainersList from './Forms/TrainerList';
import JoinAsTrainer from './Forms/JoinAsTrainer';
import ExerciseList from './Components/ExerciseList';
import BookingForm from './Forms/BookingForm'; 
import StudentLogin from './Login&Signup/StudentLogin';
import TrainerLogin from './Login&Signup/TrainerLogin';
import UserBookings from './Components/UserBookings';
import Appointments from './Components/Appointments';

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/student-login' element={<StudentLogin />} />
        <Route path='/trainer-login' element={<TrainerLogin />} />
        <Route path='/app-login-trainer' element={<AppLoginTrainer />} />
        <Route path='/app-login-student' element={<AppLoginStudent />} />
        <Route path='/bim' element={<Bim />} />
        <Route path='/signup' element={<Sign />} /> {/* Updated path */}
        <Route path='/tracker' element={<Ap />} />
        <Route path='/trainers-list' element={<TrainersList />} />
        <Route path='/join-as-trainer' element={<JoinAsTrainer />} />
        <Route path='/exercises/:muscle' element={<ExerciseList />} />
        <Route path='/booking-form' element={<BookingForm />} />
        <Route path='/user-bookings' element={<UserBookings />} /> 
        <Route path='/appointments' element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}
