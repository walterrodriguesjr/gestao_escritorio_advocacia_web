import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', marginTop: '100px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label>
            <input type="checkbox" value="remember" /> Lembrar me
          </label>
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
      <div style={{ marginTop: '15px' }}>
        <a href="#" style={{ marginRight: '10px' }}>Esqueceu a senha?</a>
        <a href="#">Ainda não é cliente?</a>
      </div>
    </div>
  );
}
