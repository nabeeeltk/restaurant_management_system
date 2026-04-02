import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { DollarSign, TrendingUp, ShoppingBag, Calendar } from 'lucide-react';
import './Reports.css';

const Reports = () => {
  const { orders } = useAppContext();

  // Calculate aggregated data
  const { totalRevenue, totalOrders, popularItems, averageOrderValue } = useMemo(() => {
    let rev = 0;
    let completed = 0;
    const itemCounts = {};

    orders.forEach(order => {
      rev += order.total;
      if (order.status === 'Completed') completed += 1;
      
      order.items.forEach(item => {
        if (!itemCounts[item.name]) {
          itemCounts[item.name] = { name: item.name, qty: 0, revenue: 0 };
        }
        itemCounts[item.name].qty += item.quantity;
        itemCounts[item.name].revenue += (item.price * item.quantity);
      });
    });

    const popular = Object.values(itemCounts).sort((a, b) => b.qty - a.qty).slice(0, 5);
    const avg = orders.length > 0 ? (rev / orders.length) : 0;

    return { 
      totalRevenue: rev, 
      totalOrders: orders.length, 
      completedOrders: completed,
      averageOrderValue: avg,
      popularItems: popular 
    };
  }, [orders]);

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="page-container animate-enter reports-page">
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <h1 className="page-title">Sales Reports & Analytics</h1>
        <button className="print-report-btn" onClick={handlePrintReport}>
          Export PDF / Print
        </button>
      </div>

      {/* Overview Cards */}
      <div className="dashboard-metrics" style={{ marginBottom: '2rem' }}>
        <div className="metric-card glass glass-panel">
          <div className="metric-bg-glow" style={{ background: '#3b82f6' }}></div>
          <div className="metric-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
            <DollarSign size={28} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Gross Sales</span>
            <span className="metric-value">${totalRevenue.toFixed(2)}</span>
          </div>
        </div>

        <div className="metric-card glass glass-panel">
          <div className="metric-bg-glow" style={{ background: '#8b5cf6' }}></div>
          <div className="metric-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>
            <ShoppingBag size={28} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Transactions</span>
            <span className="metric-value">{totalOrders}</span>
          </div>
        </div>

        <div className="metric-card glass glass-panel">
          <div className="metric-bg-glow" style={{ background: '#ec4899' }}></div>
          <div className="metric-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}>
            <TrendingUp size={28} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Average Order Value</span>
            <span className="metric-value">${averageOrderValue.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="reports-layout">
        <div className="glass-panel glass" style={{ flex: 2 }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} color="var(--primary)" /> All Transactions Ledger
          </h2>
          <div className="orders-table-wrapper" style={{ maxHeight: '450px', overflowY: 'auto' }}>
            <table className="orders-table">
              <thead>
                <tr>
                  <th style={{ position: 'sticky', top: 0, background: 'var(--bg-card)' }}>Order ID</th>
                  <th style={{ position: 'sticky', top: 0, background: 'var(--bg-card)' }}>Time</th>
                  <th style={{ position: 'sticky', top: 0, background: 'var(--bg-card)' }}>Items Qty</th>
                  <th style={{ position: 'sticky', top: 0, background: 'var(--bg-card)' }}>Total</th>
                  <th style={{ position: 'sticky', top: 0, background: 'var(--bg-card)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  [...orders].sort((a,b) => new Date(b.time) - new Date(a.time)).map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 600 }}>#{order.id}</td>
                      <td className="text-muted">{new Date(order.time).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</td>
                      <td className="order-items-preview">
                        {order.items.reduce((s, i) => s + i.quantity, 0)} items
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--primary)' }}>${order.total.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge status-${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No sales data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel glass" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Top Selling Items</h2>
          <div className="popular-items-list">
            {popularItems.length > 0 ? (
              popularItems.map((item, idx) => (
                <div key={item.name} className="popular-item-row">
                  <div className="popular-item-rank">{idx + 1}</div>
                  <div className="popular-item-info">
                    <span className="popular-item-name">{item.name}</span>
                    <span className="popular-item-stats">{item.qty} sold &middot; ${item.revenue.toFixed(2)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
                No active sales yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
