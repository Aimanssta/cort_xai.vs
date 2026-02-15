import React, { useState, useEffect } from 'react';
import { GBPStats } from '../types';
import { googleBusinessProfileAPI } from '../services/googleBusinessProfileRealtime';
import { realtimeSyncDashboard, type DashboardData } from '../services/realtimeSyncDashboard';
import {
  Eye,
  Phone,
  MapPin,
  Globe,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  BarChart3,
  MessageCircle,
  Star,
  AlertCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface GBPDashboardProps {
  stats?: GBPStats;
  loading?: boolean;
  lastSyncTime?: string;
  onRefresh?: () => void;
  gbpAccessToken?: string;
  gbpLocationId?: string;
}

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number | string;
  change?: number;
  unit?: string;
}> = ({ icon, label, value, change, unit }) => (
  <div className="bg-surface border border-surfaceHighlight rounded-lg p-4 flex items-start justify-between">
    <div className="flex items-start gap-3">
      <div className="p-2.5 rounded-lg bg-indigo-600/10 text-indigo-500">
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{label}</p>
        <p className="text-white text-2xl font-bold mt-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
          {unit && <span className="text-gray-400 text-sm ml-1">{unit}</span>}
        </p>
        {change !== undefined && (
          <p className={`text-xs mt-1 flex items-center gap-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            {Math.abs(change)}% from last month
          </p>
        )}
      </div>
    </div>
  </div>
);

const GBPDashboard: React.FC<GBPDashboardProps> = ({
  stats: initialStats = {
    viewsLastMonth: 0,
    callsLastMonth: 0,
    directionsLastMonth: 0,
    websiteVisitsLastMonth: 0,
    messagesSent: 0,
    reviewsTotal: 0,
    averageRating: 0,
    dayTrendData: [],
  },
  loading: initialLoading = false,
  lastSyncTime: initialLastSyncTime,
  onRefresh: onRefreshProp,
  gbpAccessToken,
  gbpLocationId,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<GBPStats>(initialStats);
  const [loading, setLoading] = useState(initialLoading);
  const [lastSyncTime, setLastSyncTime] = useState<string | undefined>(
    initialLastSyncTime
  );
  const [error, setError] = useState<string | null>(null);

  // Initialize and fetch real data
  useEffect(() => {
    const initializeAndFetch = async () => {
      if (!gbpAccessToken || !gbpLocationId) {
        console.warn('GBP credentials not provided, using mock data');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Initialize the real-time dashboard
        await realtimeSyncDashboard.initialize({
          gbpAccessToken,
          gbpLocationId,
        });

        // Fetch real data
        const data = await realtimeSyncDashboard.fetchAllData();

        if (data.gbpData) {
          // Parse insights data
          const insights = data.gbpData.insights || {};
          const dayTrendData = Array.isArray(insights.dayTrendData)
            ? insights.dayTrendData
            : Array.from({ length: 30 }, (_, i) => ({
                date: new Date(
                  Date.now() - (30 - i) * 24 * 60 * 60 * 1000
                ).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                }),
                views: insights.viewsLastMonth ? Math.floor(insights.viewsLastMonth / 30) : 0,
                calls: insights.callsLastMonth ? Math.floor(insights.callsLastMonth / 30) : 0,
                directions: insights.directionsLastMonth
                  ? Math.floor(insights.directionsLastMonth / 30)
                  : 0,
              }));

          setStats({
            viewsLastMonth: insights.viewsLastMonth || 0,
            callsLastMonth: insights.callsLastMonth || 0,
            directionsLastMonth: insights.directionsLastMonth || 0,
            websiteVisitsLastMonth: insights.websiteVisitsLastMonth || 0,
            messagesSent: insights.messagesSent || 0,
            reviewsTotal: data.gbpData.reviews?.length || 0,
            averageRating: insights.averageRating || 0,
            dayTrendData,
          });

          setLastSyncTime(data.gbpData.lastUpdated);
        }
      } catch (err) {
        console.error('Error initializing GBP Dashboard:', err);
        setError(
          'Failed to fetch Google Business Profile data. Using mock data for preview.'
        );
      } finally {
        setLoading(false);
      }
    };

    initializeAndFetch();

    // Set up auto-sync
    const handleRealtimeUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<DashboardData>;
      const data = customEvent.detail;

      if (data.gbpData) {
        const insights = data.gbpData.insights || {};
        setStats((prevStats) => ({
          ...prevStats,
          viewsLastMonth: insights.viewsLastMonth || prevStats.viewsLastMonth,
          callsLastMonth: insights.callsLastMonth || prevStats.callsLastMonth,
          directionsLastMonth:
            insights.directionsLastMonth || prevStats.directionsLastMonth,
          websiteVisitsLastMonth:
            insights.websiteVisitsLastMonth || prevStats.websiteVisitsLastMonth,
        }));
        setLastSyncTime(data.gbpData.lastUpdated);
      }
    };

    window.addEventListener('realtimeDataUpdate', handleRealtimeUpdate);
    return () => {
      window.removeEventListener('realtimeDataUpdate', handleRealtimeUpdate);
      realtimeSyncDashboard.stopAutoSync();
    };
  }, [gbpAccessToken, gbpLocationId]);

  // Start auto-sync every 5 minutes
  useEffect(() => {
    if (gbpAccessToken && gbpLocationId) {
      realtimeSyncDashboard.startAutoSync(300);
    }
  }, [gbpAccessToken, gbpLocationId]);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError(null);

      if (gbpAccessToken && gbpLocationId) {
        const data = await realtimeSyncDashboard.fetchAllData();

        if (data.gbpData) {
          const insights = data.gbpData.insights || {};
          setStats((prevStats) => ({
            ...prevStats,
            viewsLastMonth: insights.viewsLastMonth || prevStats.viewsLastMonth,
            callsLastMonth: insights.callsLastMonth || prevStats.callsLastMonth,
            directionsLastMonth:
              insights.directionsLastMonth || prevStats.directionsLastMonth,
            websiteVisitsLastMonth:
              insights.websiteVisitsLastMonth || prevStats.websiteVisitsLastMonth,
          }));
          setLastSyncTime(data.gbpData.lastUpdated);
        }
      }

      if (onRefreshProp) {
        await onRefreshProp();
      }
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError('Failed to refresh data. Please try again.');
    } finally {
      setRefreshing(false);
    }
  };

  const changes = {
    views: 12.5,
    calls: 8.2,
    directions: 15.3,
    website: 5.8,
  };

  return (
    <div className="space-y-8">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-600/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-red-400 font-semibold">Data Fetch Warning</p>
            <p className="text-red-300 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Google Business Profile Stats</h2>
          <p className="text-gray-400 text-sm mt-1">
            Real-time performance metrics for your business profile
            {lastSyncTime && ` • Last updated: ${new Date(lastSyncTime).toLocaleTimeString()}`}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing || loading}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 transition-all"
        >
          {refreshing ? 'Refreshing...' : 'Refresh Stats'}
        </button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Eye size={20} />}
          label="Profile Views"
          value={stats.viewsLastMonth}
          change={changes.views}
          unit="this month"
        />
        <StatCard
          icon={<Phone size={20} />}
          label="Phone Calls"
          value={stats.callsLastMonth}
          change={changes.calls}
          unit="this month"
        />
        <StatCard
          icon={<MapPin size={20} />}
          label="Direction Requests"
          value={stats.directionsLastMonth}
          change={changes.directions}
          unit="this month"
        />
        <StatCard
          icon={<Globe size={20} />}
          label="Website Visits"
          value={stats.websiteVisitsLastMonth}
          change={changes.website}
          unit="this month"
        />
      </div>

      {/* Reviews & Messages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-surfaceHighlight rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="text-yellow-400" size={20} />
            <h3 className="text-white font-semibold">Reviews</h3>
          </div>
          <p className="text-3xl font-bold text-white">{stats.reviewsTotal}</p>
          <p className="text-sm text-gray-400 mt-1">
            <span className="text-yellow-400 font-semibold">{stats.averageRating.toFixed(1)}</span> avg rating
          </p>
        </div>

        <div className="bg-surface border border-surfaceHighlight rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="text-blue-400" size={20} />
            <h3 className="text-white font-semibold">Messages</h3>
          </div>
          <p className="text-3xl font-bold text-white">{stats.messagesSent}</p>
          <p className="text-sm text-gray-400 mt-1">Customer conversations</p>
        </div>

        <div className="bg-surface border border-surfaceHighlight rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-green-400" size={20} />
            <h3 className="text-white font-semibold">Growth</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">+22.3%</p>
          <p className="text-sm text-gray-400 mt-1">Month-over-month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Trends */}
        <div className="bg-surface border border-surfaceHighlight rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">30-Day Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.dayTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #404854',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="directions"
                stroke="#ec4899"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Comparison */}
        <div className="bg-surface border border-surfaceHighlight rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Weekly Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.dayTrendData.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #404854',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="views" fill="#6366f1" radius={[8, 8, 0, 0]} />
              <Bar dataKey="calls" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface border border-surfaceHighlight rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="px-4 py-3 bg-indigo-600/10 border border-indigo-500/30 rounded-lg text-indigo-400 hover:bg-indigo-600/20 font-medium transition-all">
            View Full Analytics
          </button>
          <button className="px-4 py-3 bg-blue-600/10 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/20 font-medium transition-all">
            Create New Post
          </button>
          <button className="px-4 py-3 bg-purple-600/10 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-600/20 font-medium transition-all">
            Manage Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default GBPDashboard;
