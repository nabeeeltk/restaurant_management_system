export const initialMenu = [
  { id: '1', name: 'Classic Beef Burger', category: 'Mains', price: 14.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', description: 'Double beef patty, cheddar, house sauce', available: true },
  { id: '2', name: 'Margherita Pizza', category: 'Mains', price: 16.50, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80', description: 'Fresh mozzarella, basil, tomato sauce', available: true },
  { id: '3', name: 'Spicy Chicken Wings', category: 'Starters', price: 10.99, image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&q=80', description: 'Buffalo sauce, blue cheese dip', available: true },
  { id: '4', name: 'Caesar Salad', category: 'Starters', price: 9.99, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80', description: 'Romaine, croutons, parmesan, caesar dressing', available: true },
  { id: '5', name: 'Truffle Fries', category: 'Sides', price: 6.99, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80', description: 'Crispy fries with truffle oil and parmesan', available: true },
  { id: '6', name: 'Craft Cola', category: 'Beverages', price: 3.50, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80', description: 'Artisan cola with cane sugar', available: true },
  { id: '7', name: 'Iced Lemon Tea', category: 'Beverages', price: 3.00, image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=500&q=80', description: 'Freshly brewed iced tea with lemon', available: true },
];

export const initialOrders = [
  { id: '1001', items: [{...initialMenu[0], quantity: 2}, {...initialMenu[5], quantity: 2}], total: 36.98, status: 'Preparing', time: new Date().toISOString() },
  { id: '1002', items: [{...initialMenu[2], quantity: 1}, {...initialMenu[4], quantity: 1}], total: 17.98, status: 'New', time: new Date().toISOString() },
  { id: '1003', items: [{...initialMenu[1], quantity: 1}], total: 16.50, status: 'Ready', time: new Date(Date.now() - 15 * 60000).toISOString() },
];
