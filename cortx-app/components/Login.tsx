import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { authService } from '../services/authService';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!name || !email || !password) {
          throw new Error('Please fill in all fields');
        }
        await authService.signup({ email, password, name });
        setSuccess('Account created! You can now manage your businesses.');
        // Auto-switch to login
        setTimeout(() => {
          setMode('login');
          setPassword('');
          setName('');
        }, 1500);
      } else {
        if (!email || !password) {
          throw new Error('Please enter email and password');
        }
        await authService.login({ email, password });
        setSuccess('Login successful! Fetching your businesses...');
        setTimeout(() => {
          onLoginSuccess();
        }, 1000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-indigo-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
              <span className="text-3xl font-bold text-white">C</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Cort X AI</h1>
          <p className="text-gray-400">Smart Business Optimization Platform</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-surfaceHighlight rounded-2xl p-8 shadow-2xl shadow-black/50">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 bg-surfaceHighlight rounded-lg p-1">
            <button
              onClick={() => {
                setMode('login');
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-2 rounded-md font-medium transition-all ${
                mode === 'login'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              Login
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-2 rounded-md font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-600/10 border border-red-500/30 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-600/10 border border-green-500/30 rounded-lg p-4 flex gap-3">
              <div className="text-green-400 flex-shrink-0 mt-0.5">✓</div>
              <p className="text-green-300 text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-surfaceHighlight border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-surfaceHighlight border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">
                Use the same email as your Google Business Profile
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surfaceHighlight border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Login to Dashboard' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-xs text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Connect Real Google Business */}
          <button
            onClick={async () => {
              setError(null);
              setSuccess(null);
              setLoading(true);
              try {
                const authUrl = await authService.getGoogleAuthUrl();
                // Redirect to Google OAuth
                window.location.href = authUrl;
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to connect Google Business Profile');
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            className="w-full bg-white text-gray-900 font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-2 hover:bg-gray-100"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-600/30 border-t-gray-600 rounded-full animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Connect Google Business</span>
              </>
            )}
          </button>

          {/* Demo Info */}
          <div className="mt-6 pt-6 border-t border-surfaceHighlight">
            <p className="text-gray-500 text-xs text-center mb-3">Demo credentials:</p>
            <div className="space-y-2 text-xs bg-surfaceHighlight/50 rounded-lg p-3">
              <p className="text-gray-400">
                <strong>Email:</strong> <span className="text-gray-300">demo@example.com</span>
              </p>
              <p className="text-gray-400">
                <strong>Password:</strong> <span className="text-gray-300">demo123</span>
              </p>
            </div>
            <div className="mt-3 text-center">
              <button
                onClick={async () => {
                  setError(null);
                  setSuccess(null);
                  setLoading(true);
                  try {
                    // Try login; if user not found, create demo account then login
                    try {
                      await authService.login({ email: 'demo@example.com', password: 'demo123' });
                    } catch (err) {
                      // Create demo account
                      await authService.signup({ email: 'demo@example.com', password: 'demo123', name: 'Demo User' });
                      await authService.login({ email: 'demo@example.com', password: 'demo123' });
                    }

                    // Connect demo GBP businesses (no external API)
                    await authService.connectGBPBusinesses();

                    setSuccess('Logged in with demo account — businesses connected.');
                    setTimeout(() => onLoginSuccess(), 800);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Demo login failed');
                  } finally {
                    setLoading(false);
                  }
                }}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:opacity-90"
              >
                Use Demo Account
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-xs text-center mt-6">
          © 2024 Cort X AI. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
