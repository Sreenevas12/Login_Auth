import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginModal({ show, onClose, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!show) return null;

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setError("");
    setShowPassword(false);
  };

  const handleNormalLogin = (e) => {
    e.preventDefault();

    if (!usernameRegex.test(username)) {
      setError("Invalid username. At least 3-20 characters.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters, include letters and numbers."
      );
      return;
    }

    setUser({ name: username });
    resetForm();
    onClose();
  };

  const handleGoogleSuccess = (res) => {
    const decoded = jwtDecode(res.credential);
    setUser(decoded);
    resetForm();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Login</h3>

        <form onSubmit={handleNormalLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <div style={{ position: "relative"}}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              title={showPassword ? "Hide Password" : "Show Password"}
            />
          </div>
          <br />

          <button type="submit">Login</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <hr />

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google Login Failed")}
        />
        <br />

        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          style={{ marginTop: "10px" }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
