import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { ShoppingBag, ArrowRight, Clock, CheckCircle2, ChevronRight, PackageCheck } from 'lucide-react';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/my-orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      <main style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', padding: '2.5rem 2rem 5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase'
          }}>
            CUSTOMER ORDER ARCHIVE
          </span>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 900, marginTop: '0.4rem' }}>
            My Orders History 📦
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Track active deliveries and review your previous gourmet food experiences.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 800 }}>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="pro-glass" style={{ textAlign: 'center', padding: '5rem 2rem', borderRadius: '32px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <ShoppingBag size={38} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.6rem' }}>
              No orders placed yet!
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Treat yourself to delicious pizzas, burgers, biryanis, and cool drinks!
            </p>
            <Link to="/menu" className="btn-pro-primary" style={{ padding: '0.9rem 2.2rem' }}>
              Browse Food Menu
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => (
              <div
                key={order._id}
                className="pro-glass"
                style={{
                  padding: '1.8rem 2.2rem',
                  borderRadius: '24px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1.5rem',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)' }}>
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <span style={{
                      background: order.orderStatus === 'Delivered' ? '#dcfce7' : 'var(--primary-light)',
                      color: order.orderStatus === 'Delivered' ? '#16a34a' : 'var(--primary)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.78rem',
                      fontWeight: 800
                    }}>
                      {order.orderStatus}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>
                    {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p style={{ fontSize: '0.94rem', fontWeight: 700, marginTop: '0.4rem', color: 'var(--text-primary)' }}>
                    {order.items?.map(i => `${i.food?.name || 'Dish'} (x${i.quantity})`).join(', ')}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Amount</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                      ₹{order.totalAmount}
                    </p>
                  </div>

                  <Link
                    to={`/order-tracking/${order._id}`}
                    className="btn-pro-primary"
                    style={{ padding: '0.75rem 1.4rem', fontSize: '0.92rem' }}
                  >
                    <span>Track Live</span>
                    <ChevronRight size={17} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyOrders;
