import React, { useState, useEffect } from "react";
import { sendPasswordReset } from "../api";
const Password_reset = () =>{
    const [email,setEmail] = useState("")
    const handle_email_change = (e) => {
        try {
            setEmail(e.target.value)
        } catch (error) {
            
        }
        
    }
    const handle_submit= async ()=> {
      const data = await sendPasswordReset(email)
      console.log(data)
    }
    return (
        <>
        <div>
            <h1>Password Reset</h1>
            <p>Please enter your email address below to reset your password.</p>
            
                <input type="email" placeholder="Email" onChange={handle_email_change} />
                <button type="submit" onClick={handle_submit}>Reset Password</button>
            
            <p>If you do not receive a password reset email within a few minutes, please check your spam folder or contact support.</p>
   
        </div>
        </>
    )
}

export default Password_reset;