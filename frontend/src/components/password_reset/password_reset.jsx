import React, { useState, useEffect } from "react";
const Password_reset = () =>{
    const [email,setEmail] = useState("")
    const handle_email_change = (e) => {
        setEmail(e.target.value)
    }
    function handle_submit(){

    }
    return (
        <>
        <div>
            <h1>Password Reset</h1>
            <p>Please enter your email address below to reset your password.</p>
            <form>
                <input type="email" placeholder="Email" onChange={handle_email_change} />
                <button type="submit" onClick={handle_submit}>Reset Password</button>
            </form>
   
        </div>
        </>
    )
}

export default Password_reset;