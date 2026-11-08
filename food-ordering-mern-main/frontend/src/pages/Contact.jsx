import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import confetti from 'canvas-confetti';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  Clock, CheckCircle2, Flame, Sparkles 
} from 'lucide-react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4713', '#f59e0b', '#10b981']
      });

      setForm({ name: '', email: '', phone: '', message: '' });
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <NavBar />

      {/* Decorative ambient backdrop */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '8%',
        width: '360px',
        height: '360px',
        background: 'rgba(255, 71, 19, 0.12)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        zIndex: -1
      }} />

      <main style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', padding: '3.5rem 2rem 6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.8rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '0.45rem 1.1rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.86rem',
            fontWeight: 800,
            marginBottom: '0.9rem',
            border: '1px solid rgba(255, 71, 19, 0.2)'
          }}>
            <MessageSquare size={16} /> <span>WE ARE HERE FOR YOU 24/7</span>
          </div>

          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.8rem' }}>
            Get in Touch With Our Kitchen Team
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto' }}>
            Have questions about an order, customized catering requests, or feedback? Drop us a line!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '3.5rem',
          alignItems: 'start'
        }}>
          {/* Left Contact Information & Perks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="pro-glass" style={{ padding: '2.5rem', borderRadius: '28px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1.5rem' }}>
                Contact Details 📞
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '16px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px var(--primary-glow)'
                  }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700 }}>PHONE NUMBER</span>
                    <p style={{ fontWeight: 800, fontSize: '1.05rem', margin: 0 }}>+91 98765 43210</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '16px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px var(--primary-glow)'
                  }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700 }}>EMAIL ADDRESS</span>
                    <p style={{ fontWeight: 800, fontSize: '1.05rem', margin: 0 }}>support@foodhub.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '16px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px var(--primary-glow)'
                  }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700 }}>KITCHEN HUB</span>
                    <p style={{ fontWeight: 800, fontSize: '1.05rem', margin: 0 }}>Food Street Avenue, Kitchen Sector 4</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Mini Card */}
            <div style={{
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0,0,0,0.1)',
              position: 'relative',
              height: '240px'
            }}>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
                alt="Cozy Restaurant Dining"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 1.6rem 1.4rem',
                background: 'linear-gradient(to top, rgba(15, 18, 24, 0.9) 0%, transparent 100%)',
                color: '#fff'
              }}>
                <h4 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900 }}>Dine-in Experience Coming Soon!</h4>
                <p style={{ fontSize: '0.85rem', color: '#d1d5db' }}>Experience authentic live kitchen ambiance and freshly baked aromas.</p>
              </div>
            </div>
          </div>

          {/* Right Message Form */}
          <div className="pro-glass" style={{ padding: '2.8rem 2.4rem', borderRadius: '28px' }}>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '0.6rem' }}>
              Send Us a Message ✉️
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '2rem' }}>
              We usually respond within 15 minutes during delivery kitchen hours.
            </p>

            {submitted ? (
              <div style={{
                background: '#dcfce7',
                border: '2px solid #22c55e',
                borderRadius: '22px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <CheckCircle2 size={46} color="#16a34a" style={{ margin: '0 auto 0.8rem' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#16a34a' }}>Message Received!</h4>
                <p style={{ fontSize: '0.92rem', color: '#14532d', marginTop: '0.4rem' }}>
                  Thank you for reaching out. Our support manager will get back to you immediately!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-pro-primary"
                  style={{ marginTop: '1.4rem', padding: '0.7rem 1.6rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ marginTop: '0.35rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. rahul@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      style={{ marginTop: '0.35rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+91 9876543210"
                      value={form.phone}
                      onChange={handleChange}
                      style={{ marginTop: '0.35rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Message</label>
                  <textarea
                    name="message"
                    placeholder="How can our kitchen help you today?"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    style={{ marginTop: '0.35rem' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-pro-primary"
                  style={{
                    padding: '1rem',
                    fontSize: '1.05rem',
                    marginTop: '0.5rem',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  <Send size={18} />
                  <span>{loading ? 'Sending to Kitchen...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contact;
