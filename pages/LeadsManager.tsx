import React, { useState, useEffect } from 'react';
import { Mail, Phone, Building2, Calendar, Filter, RefreshCw, Trash2, Eye, EyeOff } from 'lucide-react';
import SEO from '../components/SEO';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest?: string;
  message?: string;
  source: string;
  timestamp: string;
  status: string;
  type: string;
}

const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'leads' | 'contacts'>('all');
  const [showPassword, setShowPassword] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchLeads = async () => {
    if (!apiKey) {
      alert('Please enter your API Key');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/get-leads?type=${filter}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (response.status === 401) {
        alert('Invalid API Key');
        setIsAuthenticated(false);
        setLeads([]);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      const data = await response.json();
      setLeads(data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching leads:', error);
      alert('Error fetching leads: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchLeads();
    }
  };

  return (
    <>
      <SEO
        title="Leads Manager - Cort X AI"
        description="View and manage all leads and contacts collected from your website."
      />

      <div className="bg-slate-950 min-h-screen pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">Leads Manager</h1>
            <p className="text-slate-400">View all submissions from contact forms and AI call agent</p>
          </div>

          {/* Authentication Section */}
          {!isAuthenticated && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Authenticate Access</h2>
              <p className="text-slate-400 mb-4">
                Enter your API Key to view leads. Set the <code className="bg-slate-950 px-2 py-1 rounded text-sm">LEADS_API_KEY</code> environment variable in Vercel.
              </p>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your API Key"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cort-500 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                </div>
                <button
                  onClick={fetchLeads}
                  disabled={loading || !apiKey}
                  className="bg-cort-600 hover:bg-cort-700 disabled:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Loading...' : 'Fetch Leads'}
                </button>
              </div>
            </div>
          )}

          {/* Leads Display */}
          {isAuthenticated && (
            <>
              {/* Filter Bar */}
              <div className="mb-8 flex gap-4 items-center justify-between flex-wrap">
                <div className="flex gap-2">
                  {(['all', 'leads', 'contacts'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilter(tab)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                        filter === tab
                          ? 'bg-cort-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      <Filter className="h-4 w-4 inline mr-2" />
                      {tab}
                    </button>
                  ))}
                </div>
                <button
                  onClick={fetchLeads}
                  disabled={loading}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-slate-800 transition-colors"
                >
                  <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              {/* Stats */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 text-sm">Total Submissions</p>
                    <p className="text-3xl font-bold text-white">{leads.length}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">Last Updated</p>
                    <p className="text-lg text-cort-400">{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>

              {/* Leads Table */}
              {leads.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
                  <p className="text-slate-400 mb-2">No submissions yet</p>
                  <p className="text-slate-500 text-sm">When people fill your contact form or use the AI call agent, they'll appear here</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {leads.map((lead) => (
                    <div key={lead._id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{lead.name}</h3>
                          <div className="flex gap-3 mt-2 flex-wrap">
                            <span className={`text-xs px-3 py-1 rounded-full ${
                              lead.type === 'lead' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                            }`}>
                              {lead.type === 'lead' ? 'AI Call Agent' : 'Contact Form'}
                            </span>
                            <span className={`text-xs px-3 py-1 rounded-full ${
                              lead.status === 'new' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'
                            }`}>
                              {lead.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">{formatDate(lead.timestamp)}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-slate-500" />
                          <a href={`mailto:${lead.email}`} className="text-cort-400 hover:text-cort-300 break-all">
                            {lead.email}
                          </a>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-slate-500" />
                            <a href={`tel:${lead.phone}`} className="text-cort-400 hover:text-cort-300">
                              {lead.phone}
                            </a>
                          </div>
                        )}
                        {lead.company && (
                          <div className="flex items-center gap-3">
                            <Building2 className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-300">{lead.company}</span>
                          </div>
                        )}
                        {lead.interest && (
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-300">{lead.interest}</span>
                          </div>
                        )}
                      </div>

                      {lead.message && (
                        <div className="bg-slate-950 rounded-lg p-4 mb-4">
                          <p className="text-sm text-slate-400">{lead.message}</p>
                        </div>
                      )}

                      <div className="flex gap-3 pt-4 border-t border-slate-800">
                        <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                          Contact
                        </button>
                        <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                          Mark as Contacted
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LeadsManager;
