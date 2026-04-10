import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await apiRegister(form.username, form.email, form.password);
      login(data.user, data.token);
      navigate('/feed');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="logo-icon large">◎</span>
          <h1>MeetO</h1>
          <p>Join the community</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-banner">{error}</div>}
          <div className="form-group">
            <label>Username</label>
            <input
              id="reg-username"
              type="text"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              placeholder="cooluser"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              id="reg-email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              id="reg-password"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          <button className="btn-primary" type="submit" disabled={loading} id="reg-submit">
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
