import { useState } from "react";
import "./register.scss";
import Header from "../Header";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../authlayout/authlayout";
export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  function handleInputChange(identifier, value) {
    setData((prevData) => ({
      ...prevData,
      [identifier]: value,
    }));
  }

  function handleRegister() {
    let newErrors = {};

    if (!data.email.includes("@")) {
      newErrors.email = "Enter a valid email address";
    }
    if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(data.password)) {
      newErrors.password =
        "Password must have at least one alphanumeric character";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      newErrors.password = "Password must have at least one special symbol";
    }

    if (data.password !== data.confirm_password) {
      newErrors.confirm_password = "Password didnt match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setSubmitted(true);
      setErrors({});
      axios
        .post(
          "https://flash-card-master-backend.vercel.app/account/register/",
          {
            username: data.username,
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
          }
        )
        .then((response) => {
          console.log("Rejestracja udana:", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("Błąd rejestracji:", error);
          // Tutaj możesz dodać obsługę błędów
        });
    }
  }
  const rightContent = (
    <div className="auth-inputs">
      <h1>Create Account</h1>
      <div className="controls">
        <input
          placeholder="Email"
          type="email"
          className={errors.email ? "invalid input-field" : "input-field"}
          value={data.email}
          onChange={(event) => handleInputChange("email", event.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          placeholder="Username"
          className="input-field"
          type="text"
          value={data.username}
          onChange={(event) =>
            handleInputChange("username", event.target.value)
          }
        />

        <input
          placeholder="Password"
          type="password"
          className={errors.password ? "invalid input-field" : "input-field"}
          value={data.password}
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <input
          placeholder="Confirm password"
          type="password"
          className={
            errors.confirm_password ? "invalid input-field" : "input-field"
          }
          value={data.confirm_password}
          onChange={(event) =>
            handleInputChange("confirm_password", event.target.value)
          }
        />
        {errors.confirm_password && (
          <span className="error">{errors.confirm_password}</span>
        )}

        <button className="btn-signup" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
  const leftcontent = (
    <div className="welcome">
      <h1>Welcome Back</h1>
      <p>To keep connect with up please loin with your personal info </p>
      <div className="login_button">
        <NavLink to={"/login"} className="btn-signin">
          SIGN UP
        </NavLink>
      </div>
    </div>
  );
  return (
    <>
      <Header />
      <AuthLayout leftContent={leftcontent} rightContent={rightContent} />
    </>
  );
}
