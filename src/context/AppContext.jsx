import React, { createContext, useState, useContext } from 'react';
import { initialMenu, initialOrders } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menu, setMenu] = useState(initialMenu);
  const [orders, setOrders] = useState(initialOrders);

  const addOrder = (order) => {
    const newOrder = {...order, id: `${1000 + orders.length + 1}`};
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addMenuItem = (item) => {
    setMenu(prev => [{...item, id: Date.now().toString()}, ...prev]);
  };
  
  const toggleMenuItemAvailability = (id) => {
    setMenu(prev => prev.map(item => item.id === id ? { ...item, available: !item.available } : item));
  };

  // Metrics for dashboard
  const todayRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orders.filter(o => o.status !== 'Completed').length;
  const completedOrdersCount = orders.filter(o => o.status === 'Completed').length;

  return (
    <AppContext.Provider value={{ 
      menu, orders, setMenu, 
      addOrder, updateOrderStatus, addMenuItem, toggleMenuItemAvailability,
      metrics: { todayRevenue, activeOrders, completedOrdersCount } 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
