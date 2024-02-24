import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useRef } from "react";
import { auth } from "../../firebase";
import "./Auth.css";
const SignIn = ({ updateState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const showErrmsg = useRef(null);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        showErrmsg.current.textContent = error.message;
        showErrmsg.current.style.width = "auto";
        showErrmsg.current.style.height = "auto";
        showErrmsg.current.style.padding = "0.5rem 1.5rem";
        setTimeout(() => {
          showErrmsg.current.style.width = "0px";
          showErrmsg.current.style.height = "0px";
          showErrmsg.current.style.padding = "0";
          showErrmsg.current.textContent = "";
        }, 4000);
      });
  };

  return (
    <div className="login-box">
      <div className="login-header">
        <header>Log In to your Account</header>
      </div>
      <div className="input-box">
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
        <button className="submit-btn" id="submit" onClick={signIn}></button>
        <label onClick={signIn}>Sign In</label>
      </div>
      <div className="sign-up-link">
        <p>Don't have account? </p>
        <p className="toggle" onClick={updateState}>
          Sign Up
        </p>
      </div>
      <div className="errormsg" ref={showErrmsg}></div>
    </div>
  );
};

export default SignIn;
