import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api";
import "./password_rest.scss";
const ChangePassword = () => {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setError("");
    setIsLoading(true);
    const token = new URLSearchParams(location.search).get("token");
    if (!token) {
      setError("Invalid token");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await resetPassword(token,formData.password );
      
      if (response.ok) {
        navigate("/login", { state: { message: "Password changed successfully" } });
      } else {
        
        setError(response.message || "An error occurred while resetting the password");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Network error or server is unreachable. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={8}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            minLength={8}
          />
        </div>
       
        <button type="submit" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? "Changing Password..." : "Change Password"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;