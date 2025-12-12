import React, { useState, useEffect } from 'react';
import { Plus, Building2, MapPin, Star, LogOut, Loader } from 'lucide-react';
import { authService, Business } from '../services/authService';

interface BusinessSelectorProps {
  onBusinessSelect: (business: Business) => void;
  onLogout: () => void;
}

const BusinessSelector: React.FC<BusinessSelectorProps> = ({ onBusinessSelect, onLogout }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = authService.getCurrentUser();

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      setLoading(true);
      const userBusinesses = authService.getUserBusinesses();
      setBusinesses(userBusinesses);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load businesses');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectGBP = async () => {
    try {
      setConnecting(true);
      setError(null);
      const gbpBusinesses = await authService.connectGBPBusinesses();
      
      if (gbpBusinesses && gbpBusinesses.length > 0) {
        setBusinesses(gbpBusinesses);
      } else {
        setError('No Google Business Profile accounts found. Please ensure you have created one in Google Business Profile.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect Google Business Profile');
    } finally {
      setConnecting(false);
    }
  };

  const handleSelectBusiness = async (business: Business) => {
    try {
      // Verify GBP ownership (demo - always succeeds)
      await authService.verifyGBPOwnership(business.id);
      onBusinessSelect(business);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify business ownership');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-indigo-950/20 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome, {user?.name || 'User'}
            </h1>
            <p className="text-gray-400">
              Select a business to manage or connect your Google Business Profile
            </p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-lg transition-all border border-red-500/30"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-600/10 border border-red-500/30 rounded-lg p-4 flex gap-3">
            <div className="text-red-400 flex-shrink-0 mt-0.5">⚠</div>
            <div>
              <p className="text-red-300 text-sm font-medium">{error}</p>
              <p className="text-red-400/70 text-xs mt-1">
                Try connecting a new Google Business Profile or creating a demo business.
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
            <p className="text-gray-400">Loading your businesses...</p>
          </div>
        ) : businesses.length === 0 ? (
          // Empty State
          <div className="bg-surface border border-surfaceHighlight rounded-2xl p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-600/20 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-indigo-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Businesses Yet</h2>
            <p className="text-gray-400 mb-6">
              Connect your Google Business Profile to start optimizing your business presence
            </p>
            <button
              onClick={handleConnectGBP}
              disabled={connecting}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {connecting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Connect Google Business Profile
                </>
              )}
            </button>
          </div>
        ) : (
          // Business Grid
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {businesses.map(business => (
                <div
                  key={business.id}
                  onClick={() => handleSelectBusiness(business)}
                  className="bg-surface border border-surfaceHighlight hover:border-indigo-500/50 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-105 group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{business.name}</h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {business.location || 'Location not specified'}
                      </p>
                    </div>
                    {business.verified && (
                      <div className="flex items-center gap-1 bg-green-600/20 text-green-400 px-3 py-1 rounded-full">
                        <Star className="w-3 h-3" />
                        <span className="text-xs font-medium">Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Category:</span>
                      <span className="text-gray-300">{business.category || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Phone:</span>
                      <span className="text-gray-300">{business.phone || 'N/A'}</span>
                    </div>
                    {business.website && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Website:</span>
                        <a
                          href={business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          Visit
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  {business.stats && (
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-surfaceHighlight/50">
                      <div className="text-center">
                        <p className="text-xl font-bold text-indigo-400">
                          {business.stats.reviews || 0}
                        </p>
                        <p className="text-xs text-gray-500">Reviews</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-indigo-400">
                          {business.stats.rating || 0}⭐
                        </p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-indigo-400">
                          {business.stats.views || 0}
                        </p>
                        <p className="text-xs text-gray-500">Views</p>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-400">Click to select</span>
                    <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Connect More Button */}
            <div className="text-center">
              <button
                onClick={handleConnectGBP}
                disabled={connecting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-lg transition-all border border-indigo-500/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {connecting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Connect Another Google Business Profile
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-surfaceHighlight/50">
        <p className="text-gray-500 text-xs text-center">
          💡 Tip: Demo businesses are available to test the platform. Connect your real Google Business Profile
          for production use.
        </p>
      </div>
    </div>
  );
};

export default BusinessSelector;
