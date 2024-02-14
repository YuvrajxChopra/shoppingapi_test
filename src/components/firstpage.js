import React, { useState } from 'react';
import './styles/firstpage.css';

const countries = [
  'Select Country',
  'India',
  'Country 2',
  'Country 3',
];

const Firstpage = () => {
  const [selectedOption, setSelectedOption] = useState('signup');
  const [formData, setFormData] = useState({
    type: 'Individual',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    mobileNumber: '',
    country: 'Select Country',
    state: '',
    city: '',
    pincode: '',
    fax: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const stateCityData = {
    India: {
      states: ['Select State', 'State 1', 'State 2', 'State 3'],
      cities: {
        'Select State': ['Select City'],
        'State 1': ['City A', 'City B', 'City C'],
        'State 2': ['City X', 'City Y', 'City Z'],
        'State 3': ['City P', 'City Q', 'City R'],
      },
    },
  };

  const handleToggle = (option) => {
    setSelectedOption(option);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.email.trim() === '' ||
      formData.address.trim() === '' ||
      formData.mobileNumber.trim() === '' ||
      formData.country === 'Select Country' ||
      formData.state.trim() === '' ||
      formData.city.trim() === '' ||
      formData.pincode.trim() === '' ||
      formData.fax.trim() === '' ||
      formData.phone.trim() === '' ||
      formData.password.trim() === '' ||
      formData.confirmPassword.trim() === '' ||
      !/^\d+$/.test(formData.phone)
    ) {
      alert('Please fill in all required fields correctly.');
    } else if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
    } else {
      const userData = {
        type: formData.type,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        mobileNumber: formData.mobileNumber,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        fax: formData.fax,
        phone: formData.phone,
        password: formData.password,
      };
      const storedUserData = localStorage.getItem('userData');
      const existingUserData = storedUserData ? JSON.parse(storedUserData) : [];
      const updatedUserData = [...existingUserData, userData];
      localStorage.setItem('userData', JSON.stringify(updatedUserData));

      alert('Form submitted successfully!');
      setSelectedOption('signin');
    }
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    console.log(email + " " + password);
  
    const storedUserData = localStorage.getItem('userData');
  
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (email === userData.email && password === userData.password) {
        alert('Signin successful!');
        window.location.href = '/shoppingpage';
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } else {
      alert('User data not found. Please sign up.');
    }
  };

  return (
    <div className="container">
      <div className="toggle">
        <div
          className={`option-container ${selectedOption === 'signin' ? 'selected' : ''}`}
          onClick={() => handleToggle('signin')}
        >
          <button className="option">Signin</button>
        </div>
        <div
          className={`option-container ${selectedOption === 'signup' ? 'selected' : ''}`}
          onClick={() => handleToggle('signup')}
        >
          <button className="option">Signup</button>
        </div>
        
      </div>
      {selectedOption === 'signup' ? (
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="type"
                value="Individual"
                checked={formData.type === 'Individual'}
                onChange={handleInputChange}
              />
              Individual
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="Enterprise"
                checked={formData.type === 'Enterprise'}
                onChange={handleInputChange}
              />
              Enterprise
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="Government"
                checked={formData.type === 'Government'}
                onChange={handleInputChange}
              />
              Government
            </label>
          </div>
          <br></br>
          <div className="name-fields">
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
          />
          <div className="address-fields">
            <div>
              <label>Country:</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>State name:</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              >
                {stateCityData[formData.country]?.states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="address-fields">
            <div>
              <label>City name:</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              >
                {stateCityData[formData.country]?.cities[formData.state]?.map(
                  (city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="address-fields">
            <div>
              <label>Fax number:</label>
              <input
                type="text"
                name="fax"
                value={formData.fax}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form className="signin-form" onSubmit={handleSignIn}>
        <label>Email:</label>
        <input type="email" name="email" />
        <label>Password:</label>
        <input type="password" name="password" />
        <div className="forgot-password">
          <a href="/forgetpassword">Forgot Password?</a>
        </div>
        <button type="submit">Signin</button>
      </form>
      )}
    </div>
  );
};

export default Firstpage;
