import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import { useAuth } from '../hooks';
import { toast } from 'react-hot-toast';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);
    let error = false;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill all the necessary fields');
      error = true;
    }

    if (password !== confirmPassword) {
      toast.error('Please make sure password and confirm password matches');
      error = true;
    }

    if (error) {
      setSigningUp(false);
      return;
    }

    let response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      navigate('/login');
      toast.success('User registered successfully, please login now');
    } else {
      toast.error(response.message);
    }

    setSigningUp(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
  );
}

export default Signup;
