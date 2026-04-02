import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './MenuEditor.css';

const MenuEditor = () => {
  const { menu, toggleMenuItemAvailability, addMenuItem } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mains',
    price: '',
    image: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return;

    addMenuItem({
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image,
      description: formData.description,
      available: true
    });

    setFormData({
      name: '',
      category: 'Mains',
      price: '',
      image: '',
      description: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page-container animate-enter">
      <div className="page-header" style={{ marginBottom: '0' }}>
        <h1 className="page-title">Menu Management</h1>
      </div>

      <div className="menu-editor-container">
        <div className="menu-list-section">
          <div className="menu-table-wrapper">
            <table className="menu-table">
              <thead>
                <tr>
                  <th>Item Details</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {menu.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="item-name-cell">
                        <img src={item.image} alt={item.name} className="item-thumb" />
                        <div className="item-details-mini">
                          <span className="item-name">{item.name}</span>
                          <span className="item-cat">{item.category}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>${item.price.toFixed(2)}</td>
                    <td>
                      <span style={{ color: item.available ? '#34d399' : '#f87171' }}>
                        {item.available ? 'Available' : 'Sold Out'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={`toggle-btn ${item.available ? 'active' : 'inactive'}`}
                        onClick={() => toggleMenuItemAvailability(item.id)}
                      >
                        {item.available ? 'Mark Sold Out' : 'Mark Available'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="add-item-panel glass-panel glass">
          <h2 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
            Add New Item
          </h2>
          
          <form className="add-item-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Item Name</label>
              <input 
                type="text" 
                name="name"
                className="form-input" 
                placeholder="e.g. Garlic Bread"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                name="category"
                className="form-input" 
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Mains">Mains</option>
                <option value="Starters">Starters</option>
                <option value="Sides">Sides</option>
                <option value="Beverages">Beverages</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                name="price"
                className="form-input" 
                placeholder="e.g. 5.99"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input 
                type="url" 
                name="image"
                className="form-input" 
                placeholder="https://..."
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Add Item to Menu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuEditor;
