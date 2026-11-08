import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, i) => sum + i.food.price * i.quantity, 0);
  const delivery = subtotal === 0 ? 0 : subtotal < 500 ? 30 : 0;
  const total = subtotal + delivery;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      <main style={{ maxWidth: '1160px', margin: '0 auto', width: '100%', padding: '2.5rem 2rem 5rem' }}>
        <div style={{ marginBottom: '2.2rem' }}>
          <span style={{
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase'
          }}>
            DELICIOUS ORDER BASKET
          </span>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 900, marginTop: '0.4rem' }}>
            Your Shopping Cart 🛒
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="pro-glass" style={{ textAlign: 'center', padding: '5.5rem 2rem', borderRadius: '32px' }}>
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.6rem',
              boxShadow: '0 10px 25px var(--primary-glow)'
            }}
            className="anim-float"
            >
              <ShoppingBag size={44} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.6rem' }}>
              Your cart is feeling empty!
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.2rem', maxWidth: '440px', margin: '0 auto 2.2rem', fontSize: '1.05rem' }}>
              Explore our mouthwatering pizzas, royal biryanis, grilled burgers, and chilled smoothies!
            </p>
            <Link to="/menu" className="btn-pro-primary" style={{ padding: '0.95rem 2.4rem', fontSize: '1.05rem' }}>
              Explore Food Menu
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.8rem',
            alignItems: 'start'
          }}>
            {/* Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {cart.map((item) => (
                <div
                  key={item.food._id}
                  className="pro-glass"
                  style={{
                    padding: '1.4rem 1.6rem',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.4rem',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img
                    src={item.food.image}
                    alt={item.food.name}
                    style={{
                      width: '95px',
                      height: '95px',
                      borderRadius: '18px',
                      objectFit: 'cover',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.08)'
                    }}
                  />

                  <div style={{ flexGrow: 1 }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: 'var(--primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      {item.food.category}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.2rem 0 0.4rem' }}>
                      {item.food.name}
                    </h3>
                    <p style={{ fontWeight: 900, color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                      ₹{item.food.price}
                    </p>
                  </div>

                  {/* Quantity Controller Pill */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    background: 'rgba(0,0,0,0.04)',
                    padding: '0.45rem 0.8rem',
                    borderRadius: 'var(--radius-pill)'
                  }}>
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.food._id, item.quantity - 1);
                        } else {
                          removeFromCart(item.food._id);
                        }
                      }}
                      style={{
                        background: '#fff',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <Minus size={15} />
                    </button>

                    <span style={{ fontWeight: 900, minWidth: '22px', textAlign: 'center', fontSize: '1rem' }}>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.food._id, item.quantity + 1)}
                      style={{
                        background: '#fff',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(item.food._id)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      padding: '0.65rem',
                      borderRadius: '50%'
                    }}
                    title="Remove dish"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary Checkout Card */}
            <div className="pro-glass" style={{
              padding: '2.4rem',
              borderRadius: '28px',
              position: 'sticky',
              top: '100px'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.6rem' }}>
                Order Summary
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Dishes Subtotal</span>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Delivery Charges</span>
                  <span style={{ fontWeight: 800, color: delivery === 0 ? '#10b981' : 'var(--text-primary)' }}>
                    {delivery === 0 ? 'FREE' : `₹${delivery}`}
                  </span>
                </div>

                {delivery > 0 && (
                  <div style={{
                    background: 'var(--primary-light)',
                    padding: '0.75rem 1rem',
                    borderRadius: '14px',
                    fontSize: '0.85rem',
                    color: 'var(--primary)',
                    fontWeight: 700
                  }}>
                    💡 Add ₹{500 - subtotal} more to unlock 100% FREE Delivery!
                  </div>
                )}

                <div style={{
                  borderTop: '1.5px solid rgba(0,0,0,0.08)',
                  paddingTop: '1.2rem',
                  marginTop: '0.4rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800 }}>Total Payable</span>
                  <span style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    background: 'var(--primary-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    ₹{total}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-pro-primary"
                style={{
                  width: '100%',
                  marginTop: '2rem',
                  padding: '1.05rem 1.6rem',
                  fontSize: '1.1rem'
                }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} />
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                justifyContent: 'center',
                marginTop: '1.5rem',
                color: 'var(--text-muted)',
                fontSize: '0.86rem',
                fontWeight: 600
              }}>
                <ShieldCheck size={20} color="#10b981" />
                <span>100% Cash on Delivery (COD) supported</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;
