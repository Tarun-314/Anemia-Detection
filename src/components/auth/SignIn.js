import { signInWithEmailAndPassword } from "firebase/auth"; // Importing function to sign in with email and password from Firebase
import React, { useState, useRef } from "react"; // Importing React and its hooks
import { auth } from "../../firebase"; // Importing authentication instance from Firebase
import "./Auth.css"; // Importing CSS file for styling

const SignIn = ({ updateState }) => {
  const [email, setEmail] = useState(""); // State variable to store email input
  const [password, setPassword] = useState(""); // State variable to store password input
  const [showPassword, setShowPassword] = useState(false); // State variable to toggle password visibility
  const showErrmsg = useRef(null); // Ref for error message display

  const signIn = (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    signInWithEmailAndPassword(auth, email, password) // Signing in with email and password
      .catch((error) => {
        // Handling sign-in errors
        showErrmsg.current.textContent = error.message; // Displaying error message
        showErrmsg.current.style.width = "auto";
        showErrmsg.current.style.height = "auto";
        showErrmsg.current.style.padding = "0.5rem 1.5rem";
        setTimeout(() => {
          // Setting a timeout to hide the error message after 4 seconds
          showErrmsg.current.style.width = "0px";
          showErrmsg.current.style.height = "0px";
          showErrmsg.current.style.padding = "0";
          showErrmsg.current.textContent = "";
        }, 4000);
      });
  };

  return (
    <div className="login-box">
      {/* Container for the sign-in form */}
      <div className="login-header">
        {/* Header section */}
        <header>Log In to your Account</header>
      </div>
      <div className="input-box">
        {/* Email input field */}
        <input
          className="input-field"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-box">
        {/* Password input field */}
        <input
          className="input-field"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="forgot">
        {/* Password visibility toggle and forgot password link */}
        <section>
          <label onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </label>
        </section>
        <section>
          <p>Forgot password</p>
        </section>
      </div>
      <div className="input-submit">
        {/* Sign-in button */}
        <button className="submit-btn" id="submit" onClick={signIn}></button>
        <label onClick={signIn}>Sign In</label>
      </div>
      <div className="sign-up-link">
        {/* Link to sign up */}
        <p>Don't have account? </p>
        <p className="toggle" onClick={updateState}>
          Sign Up
        </p>
      </div>
      <div className="errormsg" ref={showErrmsg}></div>
      {/* Error message display */}
    </div>
  );
};

export default SignIn; // Exporting the SignIn component
