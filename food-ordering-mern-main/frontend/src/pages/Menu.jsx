import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { 
  Search, ShoppingBag, Eye, Sparkles, Filter, 
  Flame, CheckCircle2, ChevronRight 
} from 'lucide-react';

const CATEGORIES_METADATA = [
  { name: 'All', emoji: '🍽️' },
  { name: 'Pizza', emoji: '🍕' },
  { name: 'Burgers', emoji: '🍔' },
  { name: 'Biryani', emoji: '🍚' },
  { name: 'Indian Food', emoji: '🍛' },
  { name: 'Chinese Food', emoji: '🥢' },
  { name: 'Sandwiches', emoji: '🥪' },
  { name: 'Desserts', emoji: '🍰' },
  { name: 'Beverages', emoji: '🍹' }
];

function Menu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (currentCategory && currentCategory !== 'All') {
        params.category = currentCategory;
      }
      const res = await api.get('/foods', { params });
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [search, currentCategory]);

  const handleCategorySelect = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleAddWithConfetti = (food, e) => {
    addToCart(food);
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 20,
      spread: 50,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ['#ff4713', '#f59e0b', '#10b981']
    });

    setToastMessage(`Added ${food.name}!`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      {/* Floating Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 9999,
          background: 'var(--dark-surface)',
          color: '#fff',
          padding: '0.9rem 1.6rem',
          borderRadius: 'var(--radius-pill)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          animation: 'fadeInUp 0.3s ease'
        }}>
          <CheckCircle2 color="#22c55e" size={20} />
          <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{toastMessage}</span>
        </div>
      )}

      <main style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '2.5rem 2rem 5rem' }}>
        {/* Animated Banner Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '0.45rem 1.1rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 800,
            fontSize: '0.86rem',
            marginBottom: '0.9rem',
            border: '1px solid rgba(255, 71, 19, 0.2)'
          }}>
            <Sparkles size={16} /> <span>100% ARTISANAL RESTAURANT QUALITY</span>
          </div>

          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.8rem' }}>
            Explore Our Grand Culinary Menu
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto 2.2rem' }}>
            Filter by your favorite craving, search dishes, or discover our top gourmet recommendations.
          </p>

          {/* Search Box with Interactive Focus */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search 
              size={22} 
              color="var(--primary)" 
              style={{ position: 'absolute', left: '20px', pointerEvents: 'none' }} 
            />
            <input 
              type="text" 
              placeholder="Search by meal name (e.g., Margherita Pizza, Chicken Biryani)..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                paddingLeft: '3.6rem',
                paddingRight: '1.4rem',
                height: '58px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '1.02rem',
                background: '#fff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                border: '1.5px solid rgba(0,0,0,0.06)'
              }}
            />
          </div>
        </div>

        {/* Categories Tab Strip with Icons */}
        <div style={{
          display: 'flex',
          gap: '0.8rem',
          overflowX: 'auto',
          paddingBottom: '1.2rem',
          marginBottom: '2.8rem',
          scrollbarWidth: 'none'
        }}>
          {CATEGORIES_METADATA.map((cat) => {
            const isSelected = currentCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                className={`cat-pill ${isSelected ? 'active' : ''}`}
              >
                <span style={{ fontSize: '1.25rem' }}>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Counter & Category Label */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.8rem',
          fontSize: '0.96rem'
        }}>
          <span style={{ color: 'var(--text-muted)' }}>
            Showing <strong>{foods.length}</strong> delicious dishes
          </span>
          <span style={{
            background: 'rgba(0,0,0,0.04)',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            Filter: <strong>{currentCategory}</strong>
          </span>
        </div>

        {/* Food Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem' }}>
            <p style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 800 }}>
              Sizzling up the menu dishes... 🍳
            </p>
          </div>
        ) : foods.length === 0 ? (
          <div className="pro-glass" style={{ textAlign: 'center', padding: '5rem 2rem', borderRadius: '28px' }}>
            <span style={{ fontSize: '3.5rem' }}>🔍</span>
            <h3 style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 900 }}>No dishes found!</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              We couldn't find any dish matching "{search}". Try searching for Pizza, Burger, or Biryani!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '2.4rem'
          }}>
            {foods.map((food) => (
              <div key={food._id} className="food-card-pro">
                {/* Image Container */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={food.image}
                    alt={food.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: 'var(--primary)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}>
                    {food.category}
                  </span>

                  <span style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    background: 'rgba(15, 18, 24, 0.88)',
                    color: '#fff',
                    backdropFilter: 'blur(8px)',
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '1.02rem',
                    fontWeight: 900
                  }}>
                    ₹{food.price}
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.45rem' }}>
                    {food.name}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.55,
                    marginBottom: '1.6rem',
                    flexGrow: 1
                  }}>
                    {food.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={(e) => handleAddWithConfetti(food, e)}
                      className="btn-pro-primary"
                      style={{ flex: 1, padding: '0.75rem 1.2rem', fontSize: '0.92rem' }}
                    >
                      <ShoppingBag size={17} /> Add to Cart
                    </button>
                    <Link
                      to={`/menu/${food._id}`}
                      style={{
                        background: 'rgba(0,0,0,0.05)',
                        color: 'var(--text-primary)',
                        padding: '0.75rem 1.1rem',
                        borderRadius: 'var(--radius-pill)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="View details"
                    >
                      <Eye size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Menu;
