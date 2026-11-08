import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import confetti from 'canvas-confetti';
import { MapPin, Phone, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    deliveryAddress: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        deliveryAddress: user.address || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const subtotal = cart.reduce((sum, i) => sum + i.food.price * i.quantity, 0);
  const deliveryCharge = subtotal === 0 ? 0 : subtotal < 500 ? 30 : 0;
  const totalAmount = subtotal + deliveryCharge;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in first to place your order.');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty.');
      navigate('/menu');
      return;
    }

    setLoading(true);
    try {
      const items = cart.map((i) => ({ food: i.food._id, quantity: i.quantity }));
      const res = await api.post('/orders', {
        deliveryAddress: form.deliveryAddress,
        phone: form.phone,
        items,
        paymentMethod: 'COD',
      });

      // Trigger Full Screen Victory Confetti Cannon!
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff4713', '#f59e0b', '#10b981', '#ffffff']
      });

      clearCart();
      navigate(`/order-tracking/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      <main style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', padding: '2.5rem 2rem 5rem' }}>
        <div style={{ marginBottom: '2.4rem' }}>
          <span style={{
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase'
          }}>
            EXPRESS DOORSTEP DISPATCH
          </span>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 900, marginTop: '0.4rem' }}>
            Complete Your Food Order 🛵
          </h1>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.8rem',
          alignItems: 'start'
        }}>
          {/* Delivery Form */}
          <form onSubmit={placeOrder} className="pro-glass" style={{ padding: '2.6rem', borderRadius: '28px' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '1.6rem' }}>
              Delivery Destination
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Delivery Full Address
                </label>
                <div style={{ position: 'relative', marginTop: '0.4rem' }}>
                  <MapPin size={19} color="var(--primary)" style={{ position: 'absolute', left: '16px', top: '16px' }} />
                  <textarea
                    name="deliveryAddress"
                    placeholder="House/Flat number, Building name, Street, Landmark, Pin code..."
                    value={form.deliveryAddress}
                    onChange={handleChange}
                    required
                    rows={3}
                    style={{ paddingLeft: '3.2rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Active Contact Phone Number
                </label>
                <div style={{ position: 'relative', marginTop: '0.4rem' }}>
                  <Phone size={19} color="var(--primary)" style={{ position: 'absolute', left: '16px', top: '16px' }} />
                  <input
                    type="text"
                    name="phone"
                    placeholder="e.g. +91 9876543210"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '3.2rem' }}
                  />
                </div>
              </div>

              {/* Payment selector */}
              <div style={{
                background: 'var(--primary-light)',
                border: '2px solid var(--primary)',
                padding: '1.4rem',
                borderRadius: '20px',
                marginTop: '0.6rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', color: 'var(--primary)', fontWeight: 900, fontSize: '1.02rem' }}>
                  <CheckCircle2 size={22} />
                  <span>Payment Method: Cash on Delivery (COD)</span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.4rem', marginLeft: '2rem', lineHeight: 1.5 }}>
                  Pay via Cash or instant UPI (Google Pay, PhonePe, Paytm) upon receiving your fresh meal from the rider.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-pro-primary"
                style={{
                  width: '100%',
                  padding: '1.1rem',
                  fontSize: '1.1rem',
                  marginTop: '1rem',
                  opacity: loading ? 0.7 : 1
                }}
              >
                <span>{loading ? 'Confirming with Kitchen...' : `Place Order (₹${totalAmount})`}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </form>

          {/* Items Summary Pill */}
          <div className="pro-glass" style={{ padding: '2.4rem', borderRadius: '28px' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '1.4rem' }}>
              Your Feast Basket ({cart.reduce((sum, i) => sum + i.quantity, 0)} Items)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.6rem', maxHeight: '300px', overflowY: 'auto' }}>
              {cart.map((item) => (
                <div key={item.food._id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={item.food.image} alt={item.food.name} style={{ width: '54px', height: '54px', borderRadius: '14px', objectFit: 'cover' }} />
                  <div style={{ flexGrow: 1 }}>
                    <p style={{ fontWeight: 800, fontSize: '0.94rem', margin: 0 }}>{item.food.name}</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontWeight: 900, fontSize: '0.96rem', color: 'var(--text-primary)' }}>
                    ₹{item.food.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Delivery Charge</span>
                <span style={{ fontWeight: 800, color: deliveryCharge === 0 ? '#10b981' : 'var(--text-primary)' }}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div style={{
                borderTop: '1.5px solid rgba(0,0,0,0.08)',
                paddingTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800 }}>Total Due</span>
                <span style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--primary)' }}>₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
