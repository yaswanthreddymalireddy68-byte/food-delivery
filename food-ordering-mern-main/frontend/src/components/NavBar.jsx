import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, User, LogOut, LayoutDashboard, Flame, 
  Utensils, Compass, Menu as MenuIcon, X 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: scrolled ? '0.75rem 1.2rem' : '1rem 1.2rem',
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.78)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: scrolled ? '0 10px 30px rgba(255, 71, 19, 0.08)' : 'none'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.45rem',
          fontWeight: 900,
          fontFamily: 'Outfit, sans-serif',
          color: 'var(--text-primary)'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            background: 'var(--primary-gradient)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 6px 16px var(--primary-glow)',
            transform: 'rotate(-4deg)'
          }}>
            <Flame size={20} />
          </div>
          <span>Food<span style={{ color: 'var(--primary)' }}>Hub</span></span>
          <span style={{
            fontSize: '0.62rem',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 800,
            textTransform: 'uppercase'
          }}>PRO</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(255, 255, 255, 0.85)',
          padding: '0.35rem 0.5rem',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
        }}>
          <Link to="/" style={{
            padding: '0.5rem 1.1rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.9rem',
            fontWeight: 700,
            background: isActive('/') ? 'var(--primary-gradient)' : 'transparent',
            color: isActive('/') ? '#fff' : 'var(--text-primary)',
            boxShadow: isActive('/') ? '0 6px 16px var(--primary-glow)' : 'none'
          }}>Home</Link>

          <Link to="/menu" style={{
            padding: '0.5rem 1.15rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: isActive('/menu') ? 'var(--primary-gradient)' : 'transparent',
            color: isActive('/menu') ? '#fff' : 'var(--text-primary)',
            boxShadow: isActive('/menu') ? '0 6px 16px var(--primary-glow)' : 'none'
          }}>
            <Utensils size={15} /> Menu
          </Link>

          <Link to="/about" style={{
            padding: '0.5rem 1.1rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.9rem',
            fontWeight: 700,
            background: isActive('/about') ? 'var(--primary-gradient)' : 'transparent',
            color: isActive('/about') ? '#fff' : 'var(--text-primary)',
            boxShadow: isActive('/about') ? '0 6px 16px var(--primary-glow)' : 'none'
          }}>About</Link>

          <Link to="/contact" style={{
            padding: '0.5rem 1.1rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.9rem',
            fontWeight: 700,
            background: isActive('/contact') ? 'var(--primary-gradient)' : 'transparent',
            color: isActive('/contact') ? '#fff' : 'var(--text-primary)',
            boxShadow: isActive('/contact') ? '0 6px 16px var(--primary-glow)' : 'none'
          }}>Contact</Link>
        </nav>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Cart Icon Pill */}
          <Link to="/cart" style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: totalItems > 0 ? 'var(--primary-gradient)' : 'rgba(255, 255, 255, 0.9)',
            color: totalItems > 0 ? '#fff' : 'var(--text-primary)',
            padding: '0.55rem 1.05rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 800,
            fontSize: '0.88rem',
            border: totalItems > 0 ? 'none' : '1.5px solid rgba(0,0,0,0.06)',
            boxShadow: totalItems > 0 ? '0 8px 20px var(--primary-glow)' : 'none'
          }}>
            <ShoppingBag size={17} />
            <span className="cart-text">Cart</span>
            {totalItems > 0 && (
              <span style={{
                background: '#fff',
                color: 'var(--primary)',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.74rem',
                fontWeight: 900
              }}>{totalItems}</span>
            )}
          </Link>

          {/* Desktop User Buttons */}
          <div className="desktop-user-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            {user ? (
              <>
                <Link to="/my-orders" style={{
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  padding: '0.55rem 0.95rem',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  color: 'var(--text-primary)'
                }}>
                  Orders
                </Link>

                {user.role === 'admin' && (
                  <Link to="/admin" title="Admin Portal" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    padding: '0.55rem 1rem',
                    borderRadius: 'var(--radius-pill)',
                    background: 'linear-gradient(135deg, #181c24 0%, #29303d 100%)',
                    color: '#fff'
                  }}>
                    <LayoutDashboard size={15} /> Admin
                  </Link>
                )}

                <Link to="/profile" title="Profile Details" style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={18} />
                </Link>

                <button onClick={logout} title="Sign Out" style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  padding: '0.55rem 0.95rem',
                  color: 'var(--text-primary)'
                }}>
                  Sign In
                </Link>
                <Link to="/register" className="btn-pro-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}>
                  Join Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.04)',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div style={{
          marginTop: '0.8rem',
          padding: '1.2rem',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.98)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem'
        }}>
          <Link to="/" style={{ padding: '0.7rem 1rem', borderRadius: '12px', fontWeight: 800, background: isActive('/') ? 'var(--primary-light)' : 'transparent', color: isActive('/') ? 'var(--primary)' : 'inherit' }}>Home</Link>
          <Link to="/menu" style={{ padding: '0.7rem 1rem', borderRadius: '12px', fontWeight: 800, background: isActive('/menu') ? 'var(--primary-light)' : 'transparent', color: isActive('/menu') ? 'var(--primary)' : 'inherit' }}>Explore Menu</Link>
          <Link to="/about" style={{ padding: '0.7rem 1rem', borderRadius: '12px', fontWeight: 800, background: isActive('/about') ? 'var(--primary-light)' : 'transparent', color: isActive('/about') ? 'var(--primary)' : 'inherit' }}>About Us</Link>
          <Link to="/contact" style={{ padding: '0.7rem 1rem', borderRadius: '12px', fontWeight: 800, background: isActive('/contact') ? 'var(--primary-light)' : 'transparent', color: isActive('/contact') ? 'var(--primary)' : 'inherit' }}>Contact</Link>

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: '0.4rem', paddingTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {user ? (
              <>
                <Link to="/my-orders" style={{ padding: '0.7rem 1rem', borderRadius: '12px', fontWeight: 800 }}>My Orders</Link>
                <Link to="/profile" style={{ padding: '0.7rem 1rem', borderRadius: '12px', fontWeight: 800 }}>Account Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" style={{ padding: '0.7rem 1rem', borderRadius: '12px', fontWeight: 800, background: 'var(--dark)', color: '#fff' }}>Admin Dashboard</Link>
                )}
                <button onClick={logout} style={{ padding: '0.7rem 1rem', borderRadius: '12px', fontWeight: 800, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', textAlign: 'left' }}>Sign Out</button>
              </>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '0.4rem' }}>
                <Link to="/login" style={{ padding: '0.75rem', borderRadius: '12px', fontWeight: 800, textAlign: 'center', background: 'rgba(0,0,0,0.04)' }}>Sign In</Link>
                <Link to="/register" className="btn-pro-primary" style={{ padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;
