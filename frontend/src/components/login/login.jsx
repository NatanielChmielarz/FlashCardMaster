import { useState } from 'react';
import "./login.scss"
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header.jsx';
export default function AuthInputs() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();;

  function handleInputChange(identifier, value) {
    setData(prevData => ({
      ...prevData,
      [identifier]: value,
    }));
  }

  function handleLogin() {
    setSubmitted(true);
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Wysyłanie danych logowania do endpointa
      axios.post('https://flash-card-master-backend.vercel.app/account/token/', {
        email: data.email,
        password: data.password,
      })
      .then(response => {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        navigate('/'); // Przekierowanie po udanym logowaniu
      })
      .catch(error => {
        setErrors({ password: 'Invalid email or password' });
      });
    }
  }

  return (
    <>
    <Header/>
    
    <div id="login-inputs">
    
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
      </div>
      
      <div className="actions">
      <button className='button' onClick={handleLogin}>Sign In</button>
        <NavLink to={'/register'}type="button" className="text-button">
          Create a new account
        </NavLink>
        
      </div>
    </div></>
  );
}
