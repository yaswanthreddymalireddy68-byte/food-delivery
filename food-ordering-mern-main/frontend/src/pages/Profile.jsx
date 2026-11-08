import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import NavBar from '../components/NavBar';
import confetti from 'canvas-confetti';
import { 
  User, Phone, MapPin, Lock, LogOut, CheckCircle2, 
  Sparkles, ShieldCheck, Heart, ShoppingBag, Flame 
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    password: '',
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/users/profile', form);
      setSaved(true);

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff4713', '#f59e0b', '#10b981']
      });

      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <NavBar />

      {/* Decorative ambient sphere */}
      <div style={{
        position: 'absolute',
        top: '12%',
        right: '8%',
        width: '380px',
        height: '380px',
        background: 'rgba(255, 71, 19, 0.12)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        zIndex: -1
      }} />

      <main style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', padding: '3.5rem 2rem 6rem' }}>
        <div style={{ marginBottom: '2.8rem' }}>
          <span style={{
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase'
          }}>
            ACCOUNT MANAGEMENT
          </span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, marginTop: '0.4rem' }}>
            User Profile & Dining Preferences
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Manage your saved delivery address, phone, and account credentials.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Left Profile Identity Avatar Card */}
          <div className="pro-glass" style={{
            padding: '2.8rem 2.2rem',
            borderRadius: '32px',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'var(--primary-gradient)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.4rem',
              fontSize: '2.5rem',
              fontWeight: 900,
              boxShadow: '0 15px 35px var(--primary-glow)'
            }}
            className="anim-float"
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.2rem' }}>
              {user?.name || 'Gourmet Foodie'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '1.2rem' }}>
              {user?.email}
            </p>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: user?.role === 'admin' ? 'linear-gradient(135deg, #181c24 0%, #29303d 100%)' : 'var(--primary-light)',
              color: user?.role === 'admin' ? '#fff' : 'var(--primary)',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 800,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              marginBottom: '2rem'
            }}>
              <Sparkles size={14} /> {user?.role === 'admin' ? 'PLATFORM ADMINISTRATOR' : 'VIP FOODIE MEMBER'}
            </span>

            {/* Quick links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'left', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.6rem' }}>
              <Link to="/my-orders" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.2rem',
                borderRadius: '16px',
                background: 'rgba(0,0,0,0.03)',
                fontWeight: 700,
                fontSize: '0.92rem',
                color: 'var(--text-primary)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <ShoppingBag size={18} color="var(--primary)" /> View My Orders
                </span>
                <span>→</span>
              </Link>

              <button
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.2rem',
                  borderRadius: '16px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  color: '#ef4444',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  marginTop: '0.5rem'
                }}
              >
                <LogOut size={18} /> Sign Out of Account
              </button>
            </div>
          </div>

          {/* Right Edit Profile Details Form */}
          <div className="pro-glass" style={{ padding: '2.8rem 2.4rem', borderRadius: '32px' }}>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              Edit Account Information 📝
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '2rem' }}>
              Update your delivery address to automatically populate future checkout requests.
            </p>

            {saved && (
              <div style={{
                background: '#dcfce7',
                border: '1.5px solid #22c55e',
                color: '#15803d',
                padding: '0.9rem 1.2rem',
                borderRadius: '16px',
                marginBottom: '1.6rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontWeight: 700,
                fontSize: '0.94rem'
              }}>
                <CheckCircle2 size={20} />
                <span>Profile details saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Full Name</label>
                <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                  <User size={19} color="var(--primary)" style={{ position: 'absolute', left: '16px', top: '15px' }} />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '3.2rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Delivery Contact Phone</label>
                <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                  <Phone size={19} color="var(--primary)" style={{ position: 'absolute', left: '16px', top: '15px' }} />
                  <input
                    type="text"
                    name="phone"
                    placeholder="+91 9876543210"
                    value={form.phone}
                    onChange={handleChange}
                    style={{ paddingLeft: '3.2rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Saved Default Delivery Address</label>
                <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                  <MapPin size={19} color="var(--primary)" style={{ position: 'absolute', left: '16px', top: '15px' }} />
                  <textarea
                    name="address"
                    placeholder="Apartment, Street name, City, Landmark, Pin code..."
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    style={{ paddingLeft: '3.2rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Change Password (leave blank to keep current)
                </label>
                <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                  <Lock size={19} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '15px' }} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={form.password}
                    onChange={handleChange}
                    style={{ paddingLeft: '3.2rem' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-pro-primary"
                style={{
                  padding: '1.05rem',
                  fontSize: '1.05rem',
                  marginTop: '0.8rem',
                  opacity: loading ? 0.7 : 1
                }}
              >
                <span>{loading ? 'Saving Changes...' : 'Save Profile Changes'}</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
