import React, { useState } from "react";
import { Textfield } from "../../components/textfield/Textfield";
import { Button } from "../../components/button/Button";
import { Link } from "react-router-dom";
import "./signup.css";
import axios from 'axios';

export const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    mobile: "",
    address: '',
    gender: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!data.firstName) newErrors.firstName = "First Name is required";
    if (!data.lastName) newErrors.lastName = "Last Name is required";

    if (!data.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = "Invalid email address";

    if (!data.dob) newErrors.dob = "Date of Birth is required"
    else if (!/^([0-9]{2})[-/]([0-9]{2})[-/]([0-9]{4})$/.test(data.dob))
      newErrors.dob = "Invalid D.O.B.";

    if (!data.mobile) newErrors.mobile = "Contact is required";
    else if (!/^([9,8,7,6]{1})([0-9]{9})$/.test(data.mobile))
        newErrors.mobile = "Invalid contact number";

    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.password) newErrors.password = "Password is required";
    else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(data.password))
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("form submitted", data);
      // Send only 'email' (username) and 'password' to the backend
      axios
        .post("http://localhost:8081/signup", {
          username: data.email, // Send email as 'username'
          password: data.password, // Send password
        })
        .then((response) => {
          console.log(response.data); // Handle success
          alert("Signup successful!");
        })
        .catch((error) => {
          console.error("There was an error signing up!", error);
          alert("Signup failed!");
        });
    }
  };

  return (
    <div className="signup">
      <div className="signupContent">
        <div className="signupTitle">Signup</div>
        <form className="signupWrapper" onSubmit={handleSubmit}>
          <Textfield
            title="First Name"
            placeholder="First Name"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
          <Textfield
            title="Last Name"
            placeholder="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
          <Textfield
            title="Email"
            placeholder="username@mail.com"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <Textfield
            title="Date of Birth"
            placeholder="dd/mm/yyyy"
            name="dob"
            value={data.dob}
            onChange={handleChange}
          />
          {errors.dob && <p className="error">{errors.dob}</p>}
          <Textfield
            title="Mobile Number"
            placeholder="+91 XXXXXXXXXX"
            name="mobile"
            value={data.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
          <Textfield
            title="Address"
            placeholder="Location"
            name="address"
            value={data.address}
            onChange={handleChange}
          />
          <div className="dropDownGender">
            <label for="gender">Gender</label>
            <select
              name="gender"
              id="genderTextfield"
              value={data.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>
          <Textfield
            title="Password"
            placeholder="Enter your password"
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <Button className="signButton" type="submit">
            Signup
          </Button>
          <div className="loginMessage">
            Already have an account, Click Here!
            <Button className="logButton">
              <Link to="/">Login</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
