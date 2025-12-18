import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login_page.css";
import axios from "axios";
import { toast } from "react-toastify";
import AuthService from "../auth_service/AuthService";

function LoginPage() {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const notifyLogin = (message: string) => {
    toast.info(message);
  };

  const notifyBackendDown = (message: string) => {
    toast.info(message);
  }
  const loginUser = async () => {
    // Simulate API call or fetch more data
    // AuthService.login(mail, password);
    await axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/login`, {
        params: {
          mail: mail,
          password: password,
        },
      })
      .then((response) => {
        if (response.status === 404) {
          notifyLogin("Incorrect credentials!");
        } else {
          const { token } = response.data;
          // Store JWT token in localStorage
          localStorage.setItem("token", token);
          navigate("/processors-list-page");
        }
      })
      .catch((error) => {
        if (error.message == "Network Error") {
          notifyBackendDown("Backend is down! App is not working at the moment");
        } else {
          notifyLogin("Incorrect Credentials!");
        }
      });
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mail && password) {
      if (
        !mail.includes("@yahoo") &&
        !mail.includes("@gmail") ||
        mail.length < 11
      ) {
        notifyLogin("Incorrect format of mail address");
      } else if (password.length < 10) {
        notifyLogin("Incorrect format of password");
      } else {
        loginUser();
        setMail("");
        setPassword("");
      }
    } else {
      notifyLogin("The fields are required!!");
    }
  };
  return (
    <div className="page">
      <div className="login_form">
        <h1>Sign In</h1>
        <input
          placeholder="Mail address:"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        ></input>
        <input
          placeholder="Password:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={(e) => handleLogin(e)}>Login</button>
      </div>
      <p>Don't have an account?</p>
      <Link to="/register-page">
        <p className="register">Register</p>
      </Link>
    </div>
  );
}

export default LoginPage;
