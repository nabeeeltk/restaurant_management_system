import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { printReceipt } from '../utils/printReceipt';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import './POS.css';

const POS = () => {
  const { menu, addOrder } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);

  const categories = ['All', ...new Set(menu.map(item => item.category))];

  const filteredMenu = useMemo(() => {
    if (activeCategory === 'All') return menu;
    return menu.filter(item => item.category === activeCategory);
  }, [menu, activeCategory]);

  const addToCart = (item) => {
    if (!item.available) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTax = cartSubtotal * 0.08; // 8% tax mock
  const cartTotal = cartSubtotal + cartTax;

  const handleCheckout = (shouldPrint = false) => {
    if (cart.length === 0) return;
    
    const newOrder = addOrder({
      items: [...cart],
      total: cartTotal,
      status: 'New',
      time: new Date().toISOString()
    });
    
    setCart([]);
    if (shouldPrint) {
      printReceipt(newOrder);
    }
  };

  return (
    <div className="page-container animate-enter">
      <div className="page-header" style={{ marginBottom: '0' }}>
        <h1 className="page-title">Point of Sale</h1>
      </div>
      
      <div className="pos-container">
        {/* Menu Section */}
        <div className="menu-section">
          <div className="category-tabs">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filteredMenu.map(item => (
              <div 
                key={item.id} 
                className={`menu-item-card ${!item.available ? 'disabled' : ''}`}
                onClick={() => addToCart(item)}
              >
                <img src={item.image} alt={item.name} className="menu-item-image" />
                <div className="menu-item-details">
                  <span className="menu-item-title">{item.name}</span>
                  <span className="menu-item-price">${item.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="cart-section glass-panel glass">
          <h2 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
            Current Order
          </h2>

          <div className="cart-items-list">
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
                <ShoppingBag size={48} style={{ opacity: 0.2, margin: '0 auto 1rem auto' }} />
                <p>Cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>
                      {item.quantity === 1 ? <Trash2 size={14} color="#ef4444" onClick={() => removeFromCart(item.id)} /> : <Minus size={14} />}
                    </button>
                    <span style={{ minWidth: '1.5rem', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>${cartTax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button 
                className="checkout-btn" 
                disabled={cart.length === 0}
                onClick={() => handleCheckout(false)}
                style={{ flex: 1, margin: 0 }}
              >
                Place Order
              </button>
              <button 
                className="checkout-btn" 
                disabled={cart.length === 0}
                onClick={() => handleCheckout(true)}
                style={{ flex: 1, margin: 0, background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}
              >
                Print Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
