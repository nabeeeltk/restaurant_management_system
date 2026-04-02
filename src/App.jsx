import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
// import pages that will be created later
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import KDS from './pages/KDS';
import MenuEditor from './pages/MenuEditor';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="pos" element={<POS />} />
          <Route path="kitchen" element={<KDS />} />
          <Route path="menu" element={<MenuEditor />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
