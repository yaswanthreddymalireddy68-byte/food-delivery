import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.food._id === food._id);
      if (exists) {
        return prev.map(i => i.food._id === food._id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { food, quantity: qty }];
    });
  };

  const updateQuantity = (foodId, qty) => {
    setCart(prev => prev.map(i => i.food._id === foodId ? { ...i, quantity: qty } : i));
  };

  const removeFromCart = (foodId) => {
    setCart(prev => prev.filter(i => i.food._id !== foodId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

