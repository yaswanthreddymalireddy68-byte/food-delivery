import React, { useEffect, useState } from 'react';
import api from '../services/api';
import NavBar from '../components/NavBar';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, Users, UtensilsCrossed, IndianRupee, 
  Trash2, Plus, Tag, CheckCircle2, Flame, Layers, 
  Edit3, X, Save 
} from 'lucide-react';

const STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

const DEFAULT_CATEGORIES = [
  'Pizza', 'Burgers', 'Biryani', 'Indian Food', 
  'Chinese Food', 'Sandwiches', 'Desserts', 'Beverages'
];

function AdminDashboard() {
  const [stats, setStats] = useState({ totalOrders: 0, totalCustomers: 0, totalFoods: 0, totalRevenue: 0 });
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Category Form
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [catLoading, setCatLoading] = useState(false);

  // New Food Form
  const [newFood, setNewFood] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    category: 'Pizza'
  });

  // Edit Food State
  const [editingFood, setEditingFood] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    category: 'Pizza',
    available: true
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, usersRes, foodsRes, catsRes] = await Promise.all([
        api.get('/orders').catch(() => ({ data: [] })),
        api.get('/users').catch(() => ({ data: [] })),
        api.get('/foods').catch(() => ({ data: [] })),
        api.get('/categories').catch(() => ({ data: [] })),
      ]);

      const allOrders = ordersRes.data || [];
      const revenue = allOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

      // Extract unique categories from both API & existing foods & defaults
      let loadedCats = (catsRes.data || []).map(c => typeof c === 'string' ? c : c.name);
      let foodCats = (foodsRes.data || []).map(f => f.category);
      let mergedCats = Array.from(new Set([...DEFAULT_CATEGORIES, ...loadedCats, ...foodCats].filter(Boolean)));

      setStats({
        totalOrders: allOrders.length,
        totalCustomers: (usersRes.data || []).length,
        totalFoods: (foodsRes.data || []).length,
        totalRevenue: revenue,
      });
      setOrders(allOrders);
      setFoods(foodsRes.data || []);
      setCategories(mergedCats);

      if (!newFood.category && mergedCats.length > 0) {
        setNewFood(prev => ({ ...prev, category: mergedCats[0] }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to update order status');
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const catName = newCategory.name.trim();
    if (!catName) return;

    setCatLoading(true);
    try {
      await api.post('/categories', { name: catName, description: newCategory.description });
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
      alert(`Category "${catName}" added!`);
      setNewCategory({ name: '', description: '' });
      fetchData();
    } catch (err) {
      // If categories endpoint is not on backend yet or fails, add to local category array
      setCategories(prev => Array.from(new Set([...prev, catName])));
      alert(`Category "${catName}" added locally!`);
      setNewCategory({ name: '', description: '' });
    } finally {
      setCatLoading(false);
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      await api.post('/foods', {
        ...newFood,
        price: Number(newFood.price),
        category: newFood.category || categories[0] || 'Pizza',
        available: true
      });
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
      alert('Dish published successfully to live menu!');
      setNewFood({
        name: '',
        description: '',
        image: '',
        price: '',
        category: categories[0] || 'Pizza'
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to add dish');
    }
  };

  // Start Editing Dish
  const startEditFood = (food) => {
    setEditingFood(food._id);
    setEditForm({
      name: food.name,
      description: food.description,
      image: food.image,
      price: food.price,
      category: food.category || categories[0] || 'Pizza',
      available: food.available !== false
    });
  };

  // Save Edited Dish
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/foods/${editingFood}`, {
        ...editForm,
        price: Number(editForm.price)
      });
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      alert('Dish updated successfully!');
      setEditingFood(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to update dish');
    }
  };

  // Delete Dish
  const handleDeleteFood = async (id, name) => {
    if (!window.confirm(`Delete dish "${name}" from live menu?`)) return;
    try {
      await api.delete(`/foods/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete item');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '2.5rem 1.5rem 5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{
            background: 'linear-gradient(135deg, #181c24 0%, #29303d 100%)',
            color: '#fff',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase'
          }}>
            ADMIN COMMAND CENTER
          </span>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 900, marginTop: '0.4rem' }}>
            Store Management & Menu Editor
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Add new categories, edit current menu dishes, manage prices, and track live kitchen orders.
          </p>
        </div>

        {/* 4 Analytics Stat Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.4rem',
          marginBottom: '3rem'
        }}>
          {[
            { label: 'Total Revenue', value: `₹${stats.totalRevenue}`, icon: <IndianRupee size={24} color="#ff4713" />, desc: 'All orders' },
            { label: 'Total Orders', value: stats.totalOrders, icon: <ShoppingBag size={24} color="#3b82f6" />, desc: 'Placed orders' },
            { label: 'Total Customers', value: stats.totalCustomers, icon: <Users size={24} color="#10b981" />, desc: 'Registered foodies' },
            { label: 'Menu Dishes', value: foods.length, icon: <UtensilsCrossed size={24} color="#8b5cf6" />, desc: `${categories.length} Categories` },
          ].map((s) => (
            <div key={s.label} className="pro-glass" style={{ padding: '1.6rem', borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)' }}>{s.label}</span>
                <div style={{ background: 'rgba(0,0,0,0.04)', padding: '0.6rem', borderRadius: '14px' }}>
                  {s.icon}
                </div>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)' }}>{s.value}</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* SECTION 1: CREATE NEW CATEGORY */}
        <div className="pro-glass" style={{ padding: '2.2rem', borderRadius: '28px', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Layers size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 900 }}>Create New Category</h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>Add custom food categories (e.g., Seafood, Rolls, Pasta, Drinks).</p>
            </div>
          </div>

          <form onSubmit={handleCreateCategory} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr)) auto',
            gap: '1.2rem',
            alignItems: 'end',
            marginBottom: '1.8rem',
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '1.4rem',
            borderRadius: '20px',
            border: '1.5px solid rgba(0,0,0,0.05)'
          }}>
            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Category Name</label>
              <input
                type="text"
                placeholder="e.g. Seafood, Starters, Ice Creams..."
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                required
                style={{ marginTop: '0.35rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Short Description</label>
              <input
                type="text"
                placeholder="e.g. Fresh ocean fish, prawns & coastal dishes"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                style={{ marginTop: '0.35rem' }}
              />
            </div>
            <button
              type="submit"
              disabled={catLoading}
              className="btn-pro-primary"
              style={{ padding: '0.85rem 1.8rem', height: '48px', fontSize: '0.95rem' }}
            >
              <Plus size={18} />
              <span>{catLoading ? 'Adding...' : 'Add Category'}</span>
            </button>
          </form>

          {/* Active Categories List */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
              Available Categories ({categories.length})
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
              {categories.map((cat, i) => (
                <div
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#fff',
                    border: '1.5px solid rgba(0,0,0,0.06)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-pill)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                >
                  <Tag size={14} color="var(--primary)" />
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: ADD NEW DISH TO MENU */}
        <div className="pro-glass" style={{ padding: '2.2rem', borderRadius: '28px', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UtensilsCrossed size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 900 }}>Add New Dish to Menu 🍳</h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>Publish a new food item instantly to the customer website.</p>
            </div>
          </div>

          <form onSubmit={handleAddFood} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.3rem' }}>
            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Dish Name</label>
              <input
                type="text"
                placeholder="e.g. Royal Prawns Dum Biryani"
                value={newFood.name}
                onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Category</label>
              <select
                value={newFood.category}
                onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                required
                style={{
                  background: '#fff',
                  cursor: 'pointer',
                  fontWeight: 700
                }}
              >
                {categories.map((c, idx) => (
                  <option key={idx} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Price (₹)</label>
              <input
                type="number"
                placeholder="399"
                value={newFood.price}
                onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Image URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={newFood.image}
                onChange={(e) => setNewFood({ ...newFood, image: e.target.value })}
                required
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Description</label>
              <textarea
                placeholder="Succulent king prawns simmered in aromatic saffron basmati..."
                value={newFood.description}
                onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
                rows={2}
                required
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="btn-pro-primary" style={{ padding: '0.9rem 2.2rem' }}>
                <Plus size={18} />
                <span>+ Publish Dish to Menu</span>
              </button>
            </div>
          </form>
        </div>

        {/* SECTION 3: EDIT CURRENT MENU DISHES */}
        <div className="pro-glass" style={{ padding: '2.2rem', borderRadius: '28px', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Edit3 size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 900 }}>Edit Current Menu Dishes 📋</h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>Modify dish name, price, category, photo URL, or remove dishes ({foods.length} items).</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxHeight: '600px', overflowY: 'auto' }}>
            {foods.map((food) => (
              <div
                key={food._id}
                style={{
                  background: '#fff',
                  border: '1.5px solid rgba(0,0,0,0.06)',
                  borderRadius: '20px',
                  padding: '1.2rem 1.6rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.2rem'
                }}
              >
                {editingFood === food._id ? (
                  /* INLINE EDIT FORM */
                  <form onSubmit={handleSaveEdit} style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 800 }}>Dish Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 800 }}>Category</label>
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        required
                      >
                        {categories.map((c, i) => (
                          <option key={i} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 800 }}>Price (₹)</label>
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 800 }}>Image URL</label>
                      <input
                        type="text"
                        value={editForm.image}
                        onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                        required
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ fontSize: '0.78rem', fontWeight: 800 }}>Description</label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows={2}
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                      <button type="submit" className="btn-pro-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem' }}>
                        <Save size={16} /> Save Changes
                      </button>
                      <button type="button" onClick={() => setEditingFood(null)} style={{ background: 'rgba(0,0,0,0.06)', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  /* NORMAL DISH ROW */
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                      <img
                        src={food.image}
                        alt={food.name}
                        style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{food.name}</h4>
                          <span style={{
                            background: 'var(--primary-light)',
                            color: 'var(--primary)',
                            padding: '0.2rem 0.65rem',
                            borderRadius: 'var(--radius-pill)',
                            fontSize: '0.75rem',
                            fontWeight: 800
                          }}>
                            {food.category}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0', maxWidth: '480px' }}>
                          {food.description}
                        </p>
                        <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                          ₹{food.price}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <button
                        onClick={() => startEditFood(food)}
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          color: '#2563eb',
                          padding: '0.6rem 1.2rem',
                          borderRadius: 'var(--radius-pill)',
                          fontWeight: 800,
                          fontSize: '0.86rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <Edit3 size={16} /> Edit Dish
                      </button>

                      <button
                        onClick={() => handleDeleteFood(food._id, food.name)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          padding: '0.6rem 1.1rem',
                          borderRadius: 'var(--radius-pill)',
                          fontWeight: 800,
                          fontSize: '0.86rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: LIVE ORDERS DISPATCHER */}
        <div className="pro-glass" style={{ padding: '2.2rem', borderRadius: '28px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '1.5rem' }}>
            Live Orders Pipeline ({orders.length}) 🛵
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {orders.map((o) => (
              <div
                key={o._id}
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1.5px solid rgba(0,0,0,0.06)',
                  borderRadius: '20px',
                  padding: '1.6rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.4rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 900, color: 'var(--primary)' }}>
                    ORDER #{o._id.slice(-6).toUpperCase()}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginTop: '0.2rem' }}>
                    {o.userId?.name || 'Customer'}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>
                    📞 {o.phone} | 📍 {o.deliveryAddress}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Items: {o.items?.map(i => `${i.food?.name || 'Dish'} (x${i.quantity})`).join(', ')}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>COD Total</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                      ₹{o.totalAmount}
                    </p>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block' }}>
                      Update Status
                    </label>
                    <select
                      value={o.orderStatus}
                      onChange={(e) => updateStatus(o._id, e.target.value)}
                      style={{
                        padding: '0.6rem 1rem',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        borderRadius: '14px',
                        background: '#fff',
                        border: '2px solid var(--primary)',
                        cursor: 'pointer'
                      }}
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
