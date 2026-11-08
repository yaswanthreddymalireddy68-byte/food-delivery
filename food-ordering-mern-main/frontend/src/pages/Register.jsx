import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NavBar from '../components/NavBar';
import { User, Mail, Lock, Phone, MapPin, ArrowRight, Flame } from 'lucide-react';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed.');
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
          maxWidth: '480px',
          padding: '2.8rem 2.2rem',
          borderRadius: '28px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.06)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
            <h1 style={{ fontSize: '1.9rem', fontWeight: 900 }}>Join FoodHub</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.4rem' }}>
              Create an account for quick food orders & tracking.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--dark)' }}>Full Name</label>
              <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '2.8rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--dark)' }}>Email Address</label>
              <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '2.8rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--dark)' }}>Password</label>
              <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '2.8rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--dark)' }}>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+91 9876543210"
                  value={form.phone}
                  onChange={handleChange}
                  style={{ marginTop: '0.35rem' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--dark)' }}>City/Area</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street / City"
                  value={form.address}
                  onChange={handleChange}
                  style={{ marginTop: '0.35rem' }}
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
              <span>{loading ? 'Creating account...' : 'Create Account'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;
