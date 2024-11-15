import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const change_password = () =>{
    const [data,setData] = useState({ password:"",confirmPassword:""})
    const [error,setErrors] = useState("")
    const location = useLocation();

    // Pobierz parametry zapytania z URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
  function handleInputChange(identifier, value) {
    setData(prevData => ({
      ...prevData,
      [identifier]: value,
    }));
  }
  function handle_sumbit(){
    if(data.password!==data.confirmPassword){
        setErrors("Passwords do not match")
        setErrors(token)
    } else{
        // Make API call to change password here
        console.log("Password changed successfully")
    }
  }
    return (

        <>
        <p>Enter new password</p>
        <input
            type="password"
            value={data.password}
            onChange={(event) => handleInputChange('password', event.target.value)}
          />
        <p>Confirm new password</p>
        <input
            type="password"
            value={data.confirmPassword}
            onChange={(event) => handleInputChange('confirmPassword', event.target.value)}
          />
        <button onClick={handle_sumbit}>Change Password</button>
        <p>{error} </p>
        </>
    )
}

export default change_password;