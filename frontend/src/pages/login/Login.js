import "./login.css";
import { Textfield } from "../../components/textfield/Textfield";
import { Button } from "../../components/button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post("http://localhost:8081/login", { email, password })
    .then((res) => {
      if (res.data.message === "Login successful!") {
        console.log(res.data.user); // Handle successful login
        alert("Login successful!");
      } else {
        alert(res.data.message); // Handle specific response messages
      }
    })
    .catch((err) => {
      console.error(err);
      alert("An error occurred. Please try again.");
    });
};

  return (
    <div className="login">
      <div className="loginContent">
        <div className="loginTitle">Login</div>
        <form className="loginWrapper" onSubmit={handleSubmit}>
          <Textfield
            title="Email"
            placeholder="username@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Textfield
            title="Password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button className="loginButton" type="submit">
            Login
          </Button>
          <div className="signupMessage">
            Don't have an account, Click Here!
            <Button className="signupButton">
              <Link to="/signup">Signup</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
