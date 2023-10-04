import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    const response = await auth.login(email, password);

    if (response.success) {
      navigate('/');
      toast.success('Logged in successfully');
    } else {
      toast.error(response.message);
    }

    setLoggingIn(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Loggin in...' : 'Log In'}
        </button>
      </div>
    </form>
  );
}

export default Login;
