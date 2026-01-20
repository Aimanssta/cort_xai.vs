import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FloridaSEO from './pages/FloridaSEO';
import SalesAI from './pages/SalesAI';
import LeadGen from './pages/LeadGen';
import LocalAIO from './pages/LocalAIO';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import LiveDemo from './pages/LiveDemo';
import LeadsManager from './pages/LeadsManager';
import PlansChatBot from './components/PlanschatBot';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="florida" element={<FloridaSEO />} />
          <Route path="solutions/sales-agents" element={<SalesAI />} />
          <Route path="solutions/lead-gen" element={<LeadGen />} />
          <Route path="solutions/local-aio" element={<LocalAIO />} />
          <Route path="live-demo" element={<LiveDemo />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<LeadsManager />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
      <PlansChatBot />
    </HashRouter>
  );
};

export default App;