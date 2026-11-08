import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { 
  Flame, Award, Heart, Sparkles, Clock, Utensils, 
  ShieldCheck, ArrowRight, Star, ChefHat, Users 
} from 'lucide-react';

function About() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <NavBar />

      {/* Ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '5%',
        width: '360px',
        height: '360px',
        background: 'rgba(255, 71, 19, 0.12)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        zIndex: -1
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '4%',
        width: '400px',
        height: '400px',
        background: 'rgba(245, 158, 11, 0.12)',
        borderRadius: '50%',
        filter: 'blur(110px)',
        zIndex: -1
      }} />

      <main style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '3.5rem 2rem 6rem' }}>
        {/* Hero Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          marginBottom: '6rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.85rem',
              fontWeight: 800,
              marginBottom: '1.2rem',
              border: '1px solid rgba(255, 71, 19, 0.2)'
            }}>
              <Flame size={16} /> OUR CULINARY ODYSSEY
            </div>

            <h1 style={{ fontSize: 'clamp(2.6rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.4rem' }}>
              Crafted With Passion. <br />
              Served With <br />
              <span style={{
                background: 'var(--primary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Uncompromising Love.
              </span>
            </h1>

            <p style={{ fontSize: '1.12rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              At FoodHub, we believe great food isn't just sustenance—it's an unforgettable memory. Born from a burning desire to bridge authentic restaurant kitchen magic directly to your cozy dining table, every single meal we curate is prepared fresh with organic herbs, slow-roasted spices, and master chef dedication.
            </p>

            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <Link to="/menu" className="btn-pro-primary" style={{ padding: '0.95rem 2.2rem', fontSize: '1.05rem' }}>
                <span>Taste Our Menu</span>
                <ArrowRight size={19} />
              </Link>
              <Link to="/contact" className="btn-pro-secondary" style={{ padding: '0.95rem 2rem', fontSize: '1.05rem' }}>
                <span>Meet Our Team</span>
              </Link>
            </div>
          </div>

          {/* Collage of Culinary Imagery */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div className="anim-float" style={{
              borderRadius: '36px',
              overflow: 'hidden',
              boxShadow: '0 30px 70px -15px rgba(255, 71, 19, 0.35)',
              border: '6px solid #fff',
              maxWidth: '460px',
              width: '100%'
            }}>
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800"
                alt="Master Chef Cooking"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Floating Chef Badge */}
            <div className="anim-float-rev" style={{
              position: 'absolute',
              bottom: '-25px',
              left: '-20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)',
              padding: '1.1rem 1.6rem',
              borderRadius: '24px',
              boxShadow: '0 20px 45px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              border: '1.5px solid rgba(255, 255, 255, 0.9)'
            }}>
              <div style={{
                background: 'var(--primary-gradient)',
                color: '#fff',
                width: '46px',
                height: '46px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ChefHat size={24} />
              </div>
              <div>
                <p style={{ fontWeight: 900, fontSize: '1.05rem', margin: 0 }}>Executive Master Chefs</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>15+ Years Culinary Heritage</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of FoodHub */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              color: 'var(--primary)',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>OUR CORE PHILOSOPHY</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.4rem' }}>
              The 3 Pillars of Perfection
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.4rem'
          }}>
            {[
              {
                icon: <Sparkles size={34} color="#ff4713" />,
                title: 'Authentic Fresh Ingredients',
                desc: 'Farm-picked vegetables, artisanal cheeses, whole aromatic spices, and unadulterated oils. No frozen shortcuts.'
              },
              {
                icon: <Flame size={34} color="#ff4713" />,
                title: 'Traditional Wood & Clay Flame',
                desc: 'From slow-cooked dum biryani handis to 450°C wood-fired pizza ovens that seal in intense smokiness and moisture.'
              },
              {
                icon: <Clock size={34} color="#ff4713" />,
                title: 'Guaranteed 25-Min Freshness',
                desc: 'Our insulated heat-lock delivery containers ensure your crust stays crisp and your curries arrive steaming hot.'
              }
            ].map((p, i) => (
              <div key={i} className="pro-glass" style={{ padding: '2.8rem 2.2rem', borderRadius: '28px' }}>
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '22px',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.6rem',
                  boxShadow: '0 8px 20px var(--primary-glow)'
                }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.8rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mouthwatering Visual Food Gallery */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              color: 'var(--primary)',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>FEAST FOR THE EYES</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.4rem' }}>
              Handcrafted Culinary Showcase
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600', title: 'Artisan Woodfired Pizza', tag: 'Stonebaked' },
              { img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600', title: 'Royal Dum Biryani', tag: 'Saffron & Herbs' },
              { img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600', title: 'Gourmet Double Burger', tag: 'Melted Cheddar' },
              { img: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600', title: 'Rich Fudgy Brownie', tag: 'Dark Chocolate' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  height: '280px',
                  borderRadius: '26px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  padding: '2rem 1.4rem 1.2rem',
                  color: '#fff'
                }}>
                  <span style={{
                    background: 'var(--primary)',
                    padding: '0.2rem 0.65rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}>{item.tag}</span>
                  <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 800, marginTop: '0.3rem' }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="pro-glass" style={{
          padding: '4rem 2.5rem',
          borderRadius: '36px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(255, 71, 19, 0.1) 0%, rgba(245, 158, 11, 0.08) 100%)',
          border: '2px solid rgba(255, 71, 19, 0.2)'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.8rem' }}>
            Ready to Experience the Feast?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto 2.4rem' }}>
            Join thousands of satisfied foodies who order their daily meals with FoodHub.
          </p>
          <Link to="/menu" className="btn-pro-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Explore Our Grand Menu
          </Link>
        </div>
      </main>
    </div>
  );
}

export default About;
