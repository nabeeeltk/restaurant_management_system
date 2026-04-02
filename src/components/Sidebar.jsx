import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, ChefHat, BookOpenText } from 'lucide-react';
import './Sidebar.css'; 

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={22} /> },
    { name: 'POS', path: '/pos', icon: <ShoppingCart size={22} /> },
    { name: 'Kitchen', path: '/kitchen', icon: <ChefHat size={22} /> },
    { name: 'Menu Editor', path: '/menu', icon: <BookOpenText size={22} /> },
  ];

  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <div className="logo-icon flex-center">
          <ChefHat size={28} color="var(--primary)" />
        </div>
        <h2>RestoSys</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">AD</div>
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Manager</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
