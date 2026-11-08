import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Lock, Mail, ArrowRight, Flame } from 'lucide-react';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      <main style={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem'
      }}>
        <div className="glass-panel" style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.8rem 2.2rem',
          borderRadius: '28px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.06)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
            <div style={{
              width: '52px',
              height: '52px',
              background: 'linear-gradient(135deg, #ff5e14 0%, #ff8c42 100%)',
              borderRadius: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 8px 20px var(--primary-glow)',
              marginBottom: '1rem',
              transform: 'rotate(-4deg)'
            }}>
              <Flame size={28} />
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 900 }}>Welcome Back!</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.4rem' }}>
              Sign in to manage your orders & discover delicious foods.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--dark)' }}>
                Email Address
              </label>
              <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. foodlover@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '2.8rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--dark)' }}>
                Password
              </label>
              <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '2.8rem' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '1rem',
                marginTop: '0.8rem',
                opacity: loading ? 0.7 : 1
              }}
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Credentials pill */}
          <div style={{
            marginTop: '1.8rem',
            padding: '0.85rem 1rem',
            background: 'var(--primary-light)',
            borderRadius: '14px',
            fontSize: '0.8rem',
            lineHeight: 1.5,
            color: 'var(--dark)'
          }}>
            <strong>Demo Admin Login:</strong><br />
            Email: <code>admin@example.com</code><br />
            Password: <code>admin123</code>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Don’t have an account yet?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              Create Account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
