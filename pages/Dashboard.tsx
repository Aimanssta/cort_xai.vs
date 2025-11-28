import React, { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, DollarSign, TrendingUp, Zap, Bot, ArrowUpRight, Phone, Mail, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/Button';

// Simulated Data Generators
const generateTrendData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      leads: Math.floor(Math.random() * 50) + 20,
      converted: Math.floor(Math.random() * 20) + 5,
    });
  }
  return data;
};

const agentActivityData = [
  { name: 'Email Outreach', value: 2450, color: '#4f46e5' },
  { name: 'SMS Follow-up', value: 1300, color: '#a855f7' },
  { name: 'Calls Logged', value: 850, color: '#10b981' },
  { name: 'LinkedIn Msg', value: 1800, color: '#3b82f6' },
];

const conversionData = [
  { name: 'Qualified', value: 400 },
  { name: 'Proposal', value: 300 },
  { name: 'Negotiation', value: 200 },
  { name: 'Closed Won', value: 150 },
];

const COLORS = ['#4f46e5', '#8b5cf6', '#ec4899', '#10b981'];

const Dashboard: React.FC = () => {
  const [trendData, setTrendData] = useState(generateTrendData());
  const [liveStats, setLiveStats] = useState({
    activeAgents: 12,
    leadsToday: 482,
    revenueToday: 14500,
    conversionRate: 3.8
  });

  // Simulate "Real-time" updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendData(prev => {
        const newData = [...prev];
        const lastItem = newData[newData.length - 1];
        // Shift data
        newData.shift();
        // Add new simulated hour (in a real app this would be more granular)
        newData.push({
          time: lastItem.time, // simplified for demo
          leads: Math.floor(Math.random() * 60) + 30,
          converted: Math.floor(Math.random() * 25) + 8,
        });
        return newData;
      });

      setLiveStats(prev => ({
        activeAgents: 12 + Math.floor(Math.random() * 3) - 1,
        leadsToday: prev.leadsToday + Math.floor(Math.random() * 2),
        revenueToday: prev.revenueToday + (Math.random() > 0.7 ? 500 : 0),
        conversionRate: 3.8 + (Math.random() * 0.2 - 0.1)
      }));

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEO 
        title="Live AI Dashboard | Cort X AI"
        description="View real-time performance of Cort X AI sales agents, lead generation metrics, and revenue conversion."
      />

      <div className="bg-slate-950 pt-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Live System Demo</span>
              </div>
              <h1 className="text-3xl font-bold text-white">Performance Monitor</h1>
              <p className="text-slate-400 text-sm">Real-time view of Agent Cluster US-East-1</p>
            </div>
            <div className="flex gap-3">
               <Button variant="outline" className="text-sm py-2 px-4">Export Report</Button>
               <Button to="/contact" variant="primary" className="text-sm py-2 px-4">Deploy Your Agents</Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 rounded-xl border border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> +12%
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{liveStats.leadsToday}</div>
              <div className="text-sm text-slate-400">Leads Generated Today</div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                </div>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> +8.5%
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">${liveStats.revenueToday.toLocaleString()}</div>
              <div className="text-sm text-slate-400">Pipeline Revenue Today</div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Bot className="h-5 w-5 text-purple-400" />
                </div>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  Active
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{liveStats.activeAgents} / 15</div>
              <div className="text-sm text-slate-400">AI Agents Online</div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Zap className="h-5 w-5 text-orange-400" />
                </div>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> +0.4%
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{liveStats.conversionRate.toFixed(1)}%</div>
              <div className="text-sm text-slate-400">Lead-to-Booking Rate</div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Main Area Chart */}
            <div className="lg:col-span-2 glass-card p-6 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-6">Real-Time Lead Inflow</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorConverted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area type="monotone" dataKey="leads" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" name="Total Leads" />
                    <Area type="monotone" dataKey="converted" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorConverted)" name="Converted" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart - Agent Activity */}
            <div className="glass-card p-6 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-6">AI Agent Actions (24h)</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={agentActivityData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="#64748b" fontSize={12} hide />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={100} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {agentActivityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid lg:grid-cols-3 gap-6">
             {/* Recent Activity Stream */}
             <div className="lg:col-span-2 glass-card p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-6">Live Activity Stream</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, color: 'text-emerald-400', bg: 'bg-emerald-500/10', text: 'Agent Alpha-1 completed call with TechCorp (2m 14s). Outcome: Meeting Booked.', time: 'Just now' },
                    { icon: Mail, color: 'text-blue-400', bg: 'bg-blue-500/10', text: 'Email sequence "SaaS Outreach" batch sent to 142 prospects.', time: '2 mins ago' },
                    { icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10', text: 'Incoming SMS from lead #9928: "Yes, I am available Tuesday."', time: '5 mins ago' },
                    { icon: Users, color: 'text-orange-400', bg: 'bg-orange-500/10', text: 'New lead enriched: VP Sales at Logistics Co.', time: '12 mins ago' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-800/30 transition-colors border border-transparent hover:border-slate-800">
                       <div className={`p-2 rounded-lg ${item.bg}`}>
                          <item.icon className={`h-5 w-5 ${item.color}`} />
                       </div>
                       <div className="flex-1">
                          <p className="text-sm text-slate-300 font-medium">{item.text}</p>
                       </div>
                       <span className="text-xs text-slate-500 whitespace-nowrap">{item.time}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* Conversion Funnel / Pie */}
             <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-6">Pipeline Health</h3>
                <div className="h-[250px] w-full relative">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                            data={conversionData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                         >
                            {conversionData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                         </Pie>
                         <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                         />
                      </PieChart>
                   </ResponsiveContainer>
                   {/* Center Text */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="text-2xl font-bold text-white">1,050</div>
                      <div className="text-xs text-slate-500">Active Deals</div>
                   </div>
                </div>
                <div className="mt-4 space-y-2">
                   {conversionData.map((entry, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                         <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index]}}></div>
                            <span className="text-slate-300">{entry.name}</span>
                         </div>
                         <span className="text-slate-400 font-mono">{entry.value}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;