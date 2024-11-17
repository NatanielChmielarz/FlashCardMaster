import { useState } from "react";
import "./login.scss";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header.jsx";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import AuthLayout from "../authlayout/authlayout.jsx";
export default function AuthInputs() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleInputChange(identifier, value) {
    setData((prevData) => ({
      ...prevData,
      [identifier]: value,
    }));
  }

  function handleLogin() {
    setSubmitted(true);
    const newErrors = {};

    if (!data.email.includes("@")) {
      newErrors.email = "Enter a valid email address";
    }
    if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(data.password)) {
      newErrors.password = "Password must have at least one uppercase letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      newErrors.password = "Password must have at least one special symbol";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Sending login data to backend
      axios
        .post("https://flash-card-master-backend.vercel.app/account/token/", {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          localStorage.setItem("accessToken", response.data.access);
          localStorage.setItem("refreshToken", response.data.refresh);
          navigate("/"); // Redirect on successful login
        })
        .catch((error) => {
          setErrors({ password: "Invalid email or password" });
        });
    }
  }
  const leftcontent = (
    <div className="welcome">
      <h1>Are you new?</h1>
      <p>Create a free account and become flashcardmaster! </p>
      <div className="register_button">
      <NavLink to={"/register"} className="btn-signin">
      SIGN UP
      </NavLink></div>
    </div>
  );
  const rightcontent = (
    <div className="create-account">
      <h1>Login to Your Account</h1>
      {/* <p>or use your email for registration:</p> */}
      <div className="control">
        <input
          type="email"
          placeholder="Email"
          aria-label="Email Input"
          className={`input-field ${errors.email ? "invalid" : ""}`}
          value={data.email}
          onChange={(event) => handleInputChange("email", event.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="password"
          placeholder="Password"
          aria-label="Password Input"
          className={`input-field ${errors.password ? "invalid" : ""}`}
          value={data.password}
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <button
          type="submit"
          className="btn-signup"
          onClick={handleLogin}
          aria-label="Sign In Button"
        >
          SIGN IN
        </button>

        <div className="password_reset">
          <NavLink to={"/Password_reset"} className="text-button">
            Forget your password?
          </NavLink>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Header />
     
      <AuthLayout leftContent={leftcontent} rightContent={rightcontent} />
    </>
  );
}
