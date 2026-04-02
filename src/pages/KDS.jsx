import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Clock } from 'lucide-react';
import './KDS.css';

const KDS = () => {
  const { orders, updateOrderStatus } = useAppContext();

  // Active columns filter out "Completed" for KDS unless requested, but let's just show New, Preparing, Ready
  const newOrders = orders.filter(o => o.status === 'New');
  const preparingOrders = orders.filter(o => o.status === 'Preparing');
  const readyOrders = orders.filter(o => o.status === 'Ready');

  const getTimeElapsed = (timeString) => {
    const diff = Math.floor((new Date() - new Date(timeString)) / 60000); // mins
    return diff < 1 ? 'Just now' : `${diff}m ago`;
  };

  const OrderCard = ({ order, nextStatus, nextLabel, nextBtnClass }) => (
    <div className={`kds-order-card status-${order.status}`}>
      <div className="kds-order-header">
        <span className="kds-order-id">#{order.id}</span>
        <span className="kds-order-time">
          <Clock size={12} /> {getTimeElapsed(order.time)}
        </span>
      </div>
      <div className="kds-order-items">
        {order.items.map((item, idx) => (
          <div key={idx} className="kds-item">
            <span className="kds-item-qty">{item.quantity}x</span>
            <span className="kds-item-name">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="kds-order-actions">
        <button 
          className={`kds-action-btn ${nextBtnClass}`}
          onClick={() => updateOrderStatus(order.id, nextStatus)}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );

  return (
    <div className="page-container animate-enter">
      <div className="page-header" style={{ marginBottom: '0' }}>
        <h1 className="page-title">Kitchen Display System</h1>
      </div>

      <div className="kds-container">
        {/* NEW COLUMN */}
        <div className="kds-column">
          <div className="kds-column-header">
            <span>New Orders</span>
            <span className="badge">{newOrders.length}</span>
          </div>
          <div className="kds-orders-list">
            {newOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                nextStatus="Preparing"
                nextLabel="Start Preparing"
                nextBtnClass="btn-start"
              />
            ))}
          </div>
        </div>

        {/* PREPARING COLUMN */}
        <div className="kds-column">
          <div className="kds-column-header">
            <span style={{ color: '#fb923c' }}>Preparing</span>
            <span className="badge">{preparingOrders.length}</span>
          </div>
          <div className="kds-orders-list">
            {preparingOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                nextStatus="Ready"
                nextLabel="Mark Ready"
                nextBtnClass="btn-ready"
              />
            ))}
          </div>
        </div>

        {/* READY COLUMN */}
        <div className="kds-column">
          <div className="kds-column-header">
            <span style={{ color: '#34d399' }}>Ready for Pickup</span>
            <span className="badge">{readyOrders.length}</span>
          </div>
          <div className="kds-orders-list">
            {readyOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                nextStatus="Completed"
                nextLabel="Complete"
                nextBtnClass="btn-complete"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KDS;
