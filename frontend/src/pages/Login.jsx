import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// ✅ This must be set globally
axios.defaults.withCredentials = true;

function Login() {
  const [usernameOrRegNo, setUsernameOrRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        usernameOrRegNo,
        password,
      });

      if(response)
      {
        console.log(response);
      }
      else{
        console.log("Error in login")
      }

      const { token, role } = response.data;

      // Store token for later authenticated requests
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'student') {
        navigate('/results');
      }

    } catch (err) {
      console.error(err);
      setErrorMsg('Invalid username or password.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username / Index Number</label>
            <input
              type="text"
              value={usernameOrRegNo}
              onChange={(e) => setUsernameOrRegNo(e.target.value)}
              placeholder="Enter your username or index number"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-extras">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
