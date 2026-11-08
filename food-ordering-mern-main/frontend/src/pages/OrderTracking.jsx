import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import NavBar from '../components/NavBar';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, Clock, ChefHat, Truck, PackageCheck, 
  ArrowLeft, Phone, MapPin, Sparkles, Flame 
} from 'lucide-react';

const STATUS_PIPELINE = [
  { status: 'Pending', label: 'Order Confirmed', desc: 'Kitchen received your ticket', emoji: '📋' },
  { status: 'Confirmed', label: 'Prep Started', desc: 'Washing fresh veggies & spices', emoji: '🧑‍🍳' },
  { status: 'Preparing', label: 'Sizzling in Kitchen', desc: 'Baking pizza & simmering biryani', emoji: '🔥' },
  { status: 'Out for Delivery', label: 'Rider on the Way', desc: 'Warm delivery box on the bike', emoji: '🛵' },
  { status: 'Delivered', label: 'Feast Delivered', desc: 'Doorbell rang! Bon appétit!', emoji: '🎉' },
];

function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data);
      if (res.data.orderStatus === 'Delivered') {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 6000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <div style={{ textAlign: 'center', padding: '6rem' }}>
          <p style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 800 }}>
            Contacting kitchen dispatcher... 📡
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <div style={{ textAlign: 'center', padding: '6rem' }}>
          <h2>Order not found</h2>
          <Link to="/my-orders" className="btn-pro-primary" style={{ marginTop: '1.5rem' }}>
            Go to My Orders
          </Link>
        </div>
      </div>
    );
  }

  const currentIdx = STATUS_PIPELINE.findIndex(s => s.status === order.orderStatus);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      <main style={{ maxWidth: '920px', margin: '0 auto', width: '100%', padding: '2.5rem 2rem 5rem' }}>
        <Link to="/my-orders" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--text-muted)',
          fontWeight: 800,
          marginBottom: '1.8rem',
          fontSize: '0.94rem'
        }}>
          <ArrowLeft size={18} /> Back to All Orders
        </Link>

        {/* Live Tracking Header Badge */}
        <div className="pro-glass" style={{
          padding: '2.4rem 2.8rem',
          borderRadius: '28px',
          marginBottom: '2.4rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.8rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                padding: '0.35rem 0.95rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                LIVE KITCHEN DISPATCH
              </span>
              <span className="anim-pulse" style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#22c55e'
              }} />
            </div>

            <h1 style={{ fontSize: '2.2rem', fontWeight: 900 }}>
              Order #{order._id.slice(-6).toUpperCase()}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginTop: '0.3rem' }}>
              Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 700 }}>Total Order Value (COD)</span>
            <div style={{
              fontSize: '2.4rem',
              fontWeight: 900,
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ₹{order.totalAmount}
            </div>
          </div>
        </div>

        {/* Visual Timeline Pipeline */}
        <div className="pro-glass" style={{ padding: '2.8rem 2.4rem', borderRadius: '28px', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '2.4rem' }}>
            Kitchen & Delivery Status 🛵
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
            {STATUS_PIPELINE.map((step, idx) => {
              const isPast = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div key={step.status} style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
                  {/* Emoji Avatar Bubble */}
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    background: isCurrent ? 'var(--primary-gradient)' : isPast ? '#22c55e' : 'rgba(0,0,0,0.04)',
                    boxShadow: isCurrent ? '0 10px 25px var(--primary-glow)' : 'none',
                    transform: isCurrent ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    flexShrink: 0
                  }}>
                    {step.emoji}
                  </div>

                  {/* Description */}
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <h4 style={{
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: isCurrent ? 'var(--primary)' : isPast ? 'var(--text-primary)' : 'var(--text-light)'
                      }}>
                        {step.label}
                      </h4>
                      {isCurrent && (
                        <span style={{
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.7rem',
                          borderRadius: 'var(--radius-pill)'
                        }}>
                          Active Step
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Food Items Overview */}
        <div className="pro-glass" style={{ padding: '2.4rem', borderRadius: '28px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1.4rem' }}>
            Dishes in this Box
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {order.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <img
                  src={item.food?.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'}
                  alt={item.food?.name}
                  style={{ width: '60px', height: '60px', borderRadius: '16px', objectFit: 'cover' }}
                />
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontWeight: 800, fontSize: '1.02rem' }}>{item.food?.name || 'Gourmet Dish'}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>Quantity: {item.quantity}</p>
                </div>
                <span style={{ fontWeight: 900, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  ₹{(item.food?.price || 0) * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '1.5px solid rgba(0,0,0,0.06)',
            marginTop: '1.8rem',
            paddingTop: '1.4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
            color: 'var(--text-muted)',
            fontSize: '0.92rem'
          }}>
            <div>📍 <strong>Address:</strong> {order.deliveryAddress}</div>
            <div>📞 <strong>Phone:</strong> {order.phone}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderTracking;
