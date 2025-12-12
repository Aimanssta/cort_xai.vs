import React, { useEffect } from 'react';
import { authService } from '../services/authService';
import { Loader } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get authorization code from URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (!code) {
          throw new Error('No authorization code received from Google');
        }

        // Exchange code for token
        await authService.handleGoogleCallback(code);

        // Redirect to app
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
        console.error('Auth callback error:', err);
      }
    };

    handleCallback();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-indigo-950/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Authentication Error</h1>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-indigo-950/20 flex items-center justify-center">
      <div className="text-center">
        <Loader className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Authenticating with Google...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
