import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext"; // <-- import useAuth
import "../auth/login.css";

const Login = () => {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { login } = useAuth(); // <-- lấy login function từ context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOremail: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data); // <-- GỌI login của AuthContext (lưu localStorage + setUser)
        history.push('/'); // chuyển về Home
      } else {
        alert("Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản và mật khẩu.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="form signin">
          <h2>Sign In</h2>
          <form onSubmit={handleLogin}>
            <div className="inputbox">
              <input
                type="text"
                value={username}
                placeholder="Username or Email"
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <i className="uil uil-user"></i>
            </div>
            <div className="inputbox">
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="uil uil-lock"></i>
            </div>
            <div className="inputbox">
              <input 
                type="submit"
                value="Login"
              />
            </div>
            <p>
              Not registered? <a href="/register" className="login">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
