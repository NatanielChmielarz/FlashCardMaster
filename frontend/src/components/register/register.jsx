import { useState } from 'react';
import "./register.scss"
import Header from '../Header';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();;
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  function handleInputChange(identifier, value) {
    setData(prevData => ({
      ...prevData,
      [identifier]: value,
    }));
  }

  function handleRegister() {
    let newErrors = {};

    if (!data.email.includes('@')) {
      newErrors.email = 'Enter a valid email address';
    }
    if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(data.password)) {
      newErrors.password = 'Password must have at least one alphanumeric character';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      newErrors.password = 'Password must have at least one special symbol';
    }

    if (data.password !== data.confirm_password) {
      newErrors.confirm_password = 'Password didnt match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setSubmitted(true);
      setErrors({});
      axios.post('https://flash-card-master-backend.vercel.app/account/register/', {
        username: data.username,
        email: data.email,
        password: data.password,
        confirm_password:data.confirm_password,
      })
      .then(response => {
        console.log('Rejestracja udana:', response.data);
        navigate('/');
        
      })
      .catch(error => {
        console.error('Błąd rejestracji:', error);
        // Tutaj możesz dodać obsługę błędów
      });
    }
  }

  return (
    <>
    <Header/>
    <div id="auth-inputs">
      <div className="controls">
        <p>
          <label>Email</label>
          <input
            type="email"
            className={errors.email ? 'invalid' : undefined}
            value={data.email}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </p>
        <p>
          <label>Username</label>
          <input
            type="text"
            value={data.username}
            onChange={(event) => handleInputChange('username', event.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            className={errors.password ? 'invalid' : undefined}
            value={data.password}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </p>
        <p>
          <label>Confirm password</label>
          <input
            type="password"
            className={errors.confirm_password ? 'invalid' : undefined}
            value={data.confirm_password}
            onChange={(event) =>
              handleInputChange('confirm_password', event.target.value)
            }
          />
          {errors.confirm_password && <span className="error">{errors.confirm_password}</span>}
        </p>
      </div>
      <div className="actions">
      <button className='button' onClick={handleRegister}>Register</button>
        <NavLink to={'/login'} type="button" className="text-button">
          You have an account? Just Login!
        </NavLink>
        
      </div>
    </div></>
  );
}
