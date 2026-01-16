import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import SalesAI from './pages/SalesAI';
import LeadGen from './pages/LeadGen';
import LocalAIO from './pages/LocalAIO';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
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
          <Route path="solutions/sales-agents" element={<SalesAI />} />
          <Route path="solutions/lead-gen" element={<LeadGen />} />
          <Route path="solutions/local-aio" element={<LocalAIO />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
      <PlansChatBot />
      <SpeedInsights />
    </HashRouter>
  );
};

export default App;