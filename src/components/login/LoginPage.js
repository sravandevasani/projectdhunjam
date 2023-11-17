import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSuccess = (token, id) => {
    // console.log("Hello", token);

    Cookies.set("dhun_token", token, { expires: 30 });
    Cookies.set("dhun_user_id", id);
    navigate("/dashboard");
  };
  const handleFailure = () => {
    console.log("Something went wrong");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(
      "https://stg.dhunjam.in/account/admin/login",
      options
    );
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (response.ok) {
      handleSuccess(data.data.token, data.data.id);
    } else {
      handleFailure();
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmitForm}>
        <h1>Venue Admin Login</h1>
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={handlePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className="sign-in">
          Sign in
        </button>
        <div>
          <button className="new-reg">New Registration ?</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
