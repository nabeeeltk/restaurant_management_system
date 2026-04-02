import React from 'react';
import { useAppContext } from '../context/AppContext';
import { printReceipt } from '../utils/printReceipt';
import { DollarSign, UtensilsCrossed, CheckCircle, Clock, Printer } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { metrics, orders } = useAppContext();

  // For display sorting newest first
  const recentOrders = [...orders].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

  return (
    <div className="page-container animate-enter">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="text-muted">Today's summary</p>
      </div>

      <div className="dashboard-metrics">
        <div className="metric-card glass glass-panel">
          <div className="metric-bg-glow" style={{ background: '#10b981' }}></div>
          <div className="metric-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <DollarSign size={28} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Today's Revenue</span>
            <span className="metric-value">${metrics.todayRevenue.toFixed(2)}</span>
          </div>
        </div>

        <div className="metric-card glass glass-panel">
          <div className="metric-bg-glow" style={{ background: '#f97316' }}></div>
          <div className="metric-icon" style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#fb923c' }}>
            <Clock size={28} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Active Orders</span>
            <span className="metric-value">{metrics.activeOrders}</span>
          </div>
        </div>

        <div className="metric-card glass glass-panel">
          <div className="metric-bg-glow" style={{ background: '#60a5fa' }}></div>
          <div className="metric-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
            <CheckCircle size={28} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Completed Orders</span>
            <span className="metric-value">{metrics.completedOrdersCount}</span>
          </div>
        </div>
      </div>

      <div className="glass-panel glass" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Recent Orders</h2>
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Time</th>
                <th>Items Summary</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map(order => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 600 }}>#{order.id}</td>
                    <td className="text-muted">{new Date(order.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="order-items-preview">
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </td>
                    <td style={{ fontWeight: 600 }}>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => printReceipt(order)}
                        style={{ background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}
                        title="Print Bill"
                      >
                        <Printer size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No recent orders to show.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
