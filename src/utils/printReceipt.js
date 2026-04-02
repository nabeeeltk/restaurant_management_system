export const printReceipt = (order) => {
  const printWindow = window.open('', '_blank', 'width=450,height=700');
  
  if (!printWindow) {
    alert("Please allow popups to print receipts.");
    return;
  }

  const date = new Date(order.time).toLocaleString();
  
  const itemsHtml = order.items.map(item => `
    <div class="item-row">
      <div class="item-details">
        <span class="item-qty">${item.quantity}</span>
        <span class="item-name">${item.name}</span>
      </div>
      <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('');

  const subtotal = order.items.reduce((s, i) => s + (i.price * i.quantity), 0);
  const tax = subtotal * 0.08;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Receipt #${order.id}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body { 
            font-family: 'Inter', sans-serif; 
            font-size: 14px; 
            margin: 0;
            padding: 2rem; 
            color: #1e293b;
            background: #f8fafc;
            display: flex;
            justify-content: center;
          }
          .receipt-card {
            background: #ffffff;
            width: 100%;
            max-width: 400px;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
            padding: 2rem;
            border: 1px solid #e2e8f0;
          }
          .header { 
            text-align: center; 
            margin-bottom: 2rem; 
            padding-bottom: 1.5rem;
            border-bottom: 2px solid #f1f5f9;
          }
          .header h2 { 
            margin: 0 0 0.5rem 0; 
            color: #0f172a;
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          .header p { 
            margin: 0; 
            color: #64748b;
            font-size: 0.85rem;
          }
          .order-meta {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            font-size: 0.85rem;
            color: #475569;
          }
          .order-meta div {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          .meta-label {
            font-weight: 500;
            color: #94a3b8;
            text-transform: uppercase;
            font-size: 0.7rem;
            letter-spacing: 0.05em;
          }
          .meta-value {
            font-weight: 600;
            color: #0f172a;
          }
          .items-container {
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 2px solid #f1f5f9;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          .item-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .item-details {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          .item-qty {
            background: #f1f5f9;
            color: #3b82f6;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 700;
          }
          .item-name {
            font-weight: 500;
            color: #334155;
          }
          .item-price {
            font-weight: 600;
            color: #0f172a;
          }
          .totals-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            color: #64748b;
          }
          .total-row.grand-total {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: #ffffff;
            padding: 1rem;
            border-radius: 12px;
            margin-top: 0.5rem;
            font-size: 1.1rem;
            font-weight: 700;
            align-items: center;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          }
          .footer {
            text-align: center;
            color: #94a3b8;
            font-size: 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          
          @media print {
            body { background: white; padding: 0; }
            .receipt-card { box-shadow: none; border: none; max-width: 100%; padding: 0; margin: 0; }
            .total-row.grand-total { 
              background: #f8fafc; 
              color: #0f172a; 
              border: 2px solid #0f172a;
              box-shadow: none;
            }
            /* Need to force printing of background colors */
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-card">
          <div class="header">
            <h2>RestoSys</h2>
            <p>123 Restaurant St, Food City</p>
            <p>Tel: (555) 123-4567</p>
          </div>
          
          <div class="order-meta">
            <div>
              <span class="meta-label">Order ID</span>
              <span class="meta-value">#${order.id}</span>
            </div>
            <div style="text-align: right;">
              <span class="meta-label">Date & Time</span>
              <span class="meta-value">${date}</span>
            </div>
          </div>

          <div class="items-container">
            ${itemsHtml}
          </div>

          <div class="totals-container">
            <div class="total-row">
              <span>Subtotal</span>
              <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Tax (8%)</span>
              <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="total-row grand-total">
              <span>Total Amount</span>
              <span>$${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <span>Thank you for dining with us!</span>
            <span>Please come again</span>
          </div>
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }, 250);
          }
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
};
