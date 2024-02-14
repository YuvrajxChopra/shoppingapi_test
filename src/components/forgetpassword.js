import React, { useState } from 'react';
import './styles/forgetpassword.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleReset = () => {
    setEmail('');
  };

  const handleSigninSignup = () => {
    console.log('Navigate to signin/signup page or perform other actions');
    window.location.href = '/';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forget Password request submitted for email:', email);
  };

  return (
    <div className="forget-password-container">
      <form className="forget-password-form" onSubmit={handleSubmit}>
        <h2>Forget Password</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="signin-signup-link">
          <span>Remember your password? </span>
          <button type="button" onClick={handleSigninSignup}>
            Signin/Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
