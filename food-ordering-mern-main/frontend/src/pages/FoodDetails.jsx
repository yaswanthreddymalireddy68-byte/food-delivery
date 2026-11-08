import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import NavBar from '../components/NavBar';
import { CartContext } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { ShoppingBag, ArrowLeft, Star, Clock, ShieldCheck, Flame, Plus, Minus } from 'lucide-react';

function FoodDetails() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await api.get(`/foods/${id}`);
        setFood(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  const handleAddToCart = (e) => {
    addToCart(food, qty);
    setAdded(true);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 40,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ['#ff4713', '#f59e0b', '#10b981']
    });

    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <div style={{ textAlign: 'center', padding: '6rem' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 800 }}>Plating the dish...</p>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <div style={{ textAlign: 'center', padding: '6rem' }}>
          <h2>Food item not found</h2>
          <Link to="/menu" className="btn-pro-primary" style={{ marginTop: '1.5rem' }}>
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      <main style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '2.5rem 2rem 5rem' }}>
        <Link to="/menu" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--text-muted)',
          fontWeight: 800,
          marginBottom: '2rem',
          fontSize: '0.94rem'
        }}>
          <ArrowLeft size={18} /> Back to Menu
        </Link>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Left Food Image with Floating Shadow Frame */}
          <div className="anim-float" style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '36px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px -15px rgba(255, 71, 19, 0.35)',
              border: '6px solid #fff'
            }}>
              <img
                src={food.image}
                alt={food.name}
                style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <span style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: 'var(--primary)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              {food.category}
            </span>
          </div>

          {/* Right Product Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b' }}>
                <Star size={18} fill="#f59e0b" />
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>4.9</span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>• 250+ reviews</span>
              <span style={{
                background: '#dcfce7',
                color: '#16a34a',
                padding: '0.2rem 0.6rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>IN STOCK</span>
            </div>

            <h1 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.15 }}>
              {food.name}
            </h1>

            <div style={{
              fontSize: '2.4rem',
              fontWeight: 900,
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.4rem'
            }}>
              ₹{food.price}
            </div>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '2.2rem'
            }}>
              {food.description} Handcrafted by our culinary masters using premium fresh ingredients, authentic spice extracts, and baked or cooked to perfection.
            </p>

            {/* Qty & Add to cart button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                background: 'rgba(0,0,0,0.05)',
                padding: '0.5rem 0.9rem',
                borderRadius: 'var(--radius-pill)'
              }}>
                <button
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  style={{
                    background: '#fff',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                  }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ fontWeight: 900, minWidth: '24px', textAlign: 'center', fontSize: '1.1rem' }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{
                    background: '#fff',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-pro-primary"
                style={{ padding: '1rem 2.4rem', fontSize: '1.08rem', flex: 1 }}
              >
                <ShoppingBag size={20} />
                <span>{added ? 'Added to Cart! 🎉' : `Add ${qty} to Cart (₹${food.price * qty})`}</span>
              </button>
            </div>

            {/* Feature badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.2rem',
              borderTop: '1.5px solid rgba(0,0,0,0.06)',
              paddingTop: '1.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <Clock size={20} color="var(--primary)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>25-30 Min Doorstep Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <ShieldCheck size={20} color="#10b981" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Cash on Delivery Supported</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FoodDetails;
