import React, { useState } from "react";
import { useHistory } from "react-router-dom";


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        history.push("/login");
      } else {
        alert("Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.");
    }
  };

  return (
    <div className="register-page" style={{ backgroundColor: "#0d0d0d", minHeight: "100vh", paddingTop: "60px" }}>
     
      <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="form signup" style={{
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(255, 0, 0, 0.3)",
          width: "100%",
          maxWidth: "400px",
        }}>
          <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "20px" }}>Create Account</h2>
          <form onSubmit={handleRegister}>
            <div className="inputbox" style={{ marginBottom: "20px" }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                style={inputStyle}
                required
              />
            </div>
            <div className="inputbox" style={{ marginBottom: "20px" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                style={inputStyle}
                required
              />
            </div>
            <div className="inputbox" style={{ marginBottom: "20px" }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create Password"
                style={inputStyle}
                required
              />
            </div>
            <div className="inputbox" style={{ marginBottom: "20px" }}>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                style={inputStyle}
                required
              />
            </div>
            <div className="inputbox" style={{ marginBottom: "20px" }}>
              <input
                type="submit"
                value="Sign Up"
                style={{
                  ...inputStyle,
                  backgroundColor: "#e50914",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: "none",
                }}
              />
            </div>
            <p style={{ color: "#ccc", textAlign: "center" }}>
              Already have an account?{" "}
              <a href="/login" style={{ color: "#e50914", textDecoration: "underline" }}>
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "6px",
  backgroundColor: "#333",
  border: "1px solid #555",
  color: "#fff",
  outline: "none",
  fontSize: "16px",
};

export default Register;
